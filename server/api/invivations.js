const express = require("express");
const invitationsRouter = express.Router();
const { verifyToken } = require("./utils");
const { getAllInvitations, createInvitations } = require("../db");

invitationsRouter.use((req, res, next) => {
  console.log("A request is being made to /invitations");
  next();
});

invitationsRouter.get("/", async (req, res, next) => {
  try {
    const invitations = await getAllInvitations();

    res.send({
      invitations,
    });
  } catch (error) {
    next(error);
  }
});

invitationsRouter.get("issued/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const issued = await getInvitationsById(userId);

    res.send(issued);
  } catch (error) {
    next(error);
  }
});

invitationsRouter.get("received/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const received = await getInvitationsById(userId);

    res.send(received);
  } catch (error) {
    next(error);
  }
});

invitationsRouter.post(
  "/newinvitations",
  verifyToken,
  async (req, res, next) => {
    try {
      const { message } = req.body;

      const invitationsInfo = {
        message,
      };

      await createInvitations(invitationsInfo);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = invitationsRouter;
