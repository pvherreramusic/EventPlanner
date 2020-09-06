const { client } = require("./client");

module.exports = {
  client,
  ...require("./users"),
  ...require("./events"),
  ...require("./groups"),
  ...require("./user_group"),
  ...require("./invations"),
  ...require("./comment"),
  

};
