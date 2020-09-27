require("dotenv").config();

const chalk = require("chalk");
const express = require("express");
const { client } = require("./db");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const apiRouter = require("./api");

const server = express();
const PORT = process.env.PORT || 3001;

client.connect();

server.use(bodyParser.json());
const myOAuth2Client = new OAuth2(
  "774002316425-on9m0ae5gapdkcu2k3kobg96ps2oevda.apps.googleusercontent.com",
  "rieklb20WtBECEGVlzCEP7a1",
  "https://developers.google.com/oauthplayground"
  )

  myOAuth2Client.setCredentials({
    refresh_token:"1//04KtDr-GuSQSiCgYIARAAGAQSNwF-L9IroIh6Rtg2W8UF-JXQ9ta_EfViT4YXQUstnDSidDN5GPe5mcFpCfYUzkAh07k1HBfdxvY"
    });

    const myAccessToken = myOAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
           type: "OAuth2",
           user: "trachkid@gmail.com", 
           clientId: "774002316425-on9m0ae5gapdkcu2k3kobg96ps2oevda.apps.googleusercontent.com",
           clientSecret: "rieklb20WtBECEGVlzCEP7a1",
           refreshToken: "1//04KtDr-GuSQSiCgYIARAAGAQSNwF-L9IroIh6Rtg2W8UF-JXQ9ta_EfViT4YXQUstnDSidDN5GPe5mcFpCfYUzkAh07k1HBfdxvY",
           accessToken: myAccessToken 
      }});

      server.post('/sendemail',function(req,res){
      var personname = req.body.personname
      var yourname = req.body.yourname
  var email = req.body.email
  var subject = req.body.subject
  var message = req.body.message
  var group = req.body.group
  var content = `Hey ${personname} \n message from ${yourname} asking you to join or explore the group ${group} \n MESSAGE:  ${message} \n for ${group}  at EVENT PLANNER APP  (https://limitless-forest-30502.herokuapp.com/exploregroups). \n Please sign up and find the group name under the explore groups tab and if login in, join group to see events! `
        
        const mailOptions = {
          from: yourname,
          to: email,
          subject: subject,
          text: content,
      
          }
          transport.sendMail(mailOptions,function(err,result){
            if(err){
            res.send({
            message:err
            })
            }else{
            transport.close();
            res.send({
            message:'Email has been sent: check your inbox!'
            })
            }
            })
            })


server.use(express.static(path.join(__dirname, "../dist")));
server.use("/api", apiRouter);



server.listen(PORT, () =>
  console.log(chalk.red(`Big Brother can see you on port ${PORT}`))
);

server.get("/health", (req, res, next) => {
  res.send({
    message: "Server is healthy!",
  });
});

server.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "..", "dist/index.html"));
});


  