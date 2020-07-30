const express = require("express");
const apiRouter = express.Router();

apiRouter.get("/", async (req, res, next) => {
  res.send({ message: "You've reached /api" });

  next();
});


const userRouter = require("./users");
apiRouter.use("/users", userRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
