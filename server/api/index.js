const express = require("express");
const apiRouter = express.Router();




apiRouter.get("/", async (req, res, next) => {
  res.send({ message: "You've reached /api" });

  next();
});



const userRouter = require("./users");
apiRouter.use("/users", userRouter);

const eventRouter = require("./event")
apiRouter.use("/events", eventRouter);

const groupRouter = require("./group")
apiRouter.use("/groups", groupRouter);

const commentRouter = require("./comment")
apiRouter.use("/comments", commentRouter);



apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
