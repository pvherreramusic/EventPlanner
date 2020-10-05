const express = require("express");
const eventRouter = express.Router();
const { verifyToken } = require("./utils");
const {
  createEvent,
  updateEvent,
  getEventByUserId,
  getEventById,
  getAllEvents,
  getEventByGroupId,
  getAllUsers,
} = require("../db");

eventRouter.use((req, res, next) => {
  console.log("A request is being made to /event");
  next();
});

eventRouter.get("/allevents", async (req, res, next) => {
  try {
    const events = await getAllEvents();

    res.send({
      events,
    });
  } catch (error) {
    next(error);
  }
});

eventRouter.get("/event/:eventid", async (req, res, next) => {
  const { eventid } = req.params;

  try {
    const userEvent = await getEventByUserId(eventid);

    if (!userEvent) {
      return res.status(404).json({
        error: `No user found with Id: ${userId}`,
      });
    }

    res.send({
      userEvent,
    });
  } catch (error) {
    next(error);
  }
});

// eventRouter.get('/:eventId/anevent', async(req, res, next) => {

//   const { eventId } = req.params;

//   try {

//     const anEvent = await getEventByEventId(eventId)

//     res.send(anEvent);
//   } catch (error) {
//     next(error);
//   }
// });

eventRouter.get("/bygroup/:groupid", async (req, res, next) => {
  const { groupid } = req.params;

  try {
    const evnt = await getEventByGroupId(groupid);

    if (!evnt) {
      return res.status(404).json({
        error: `No user found with Id: ${groupid}`,
      });
    }

    res.send({
      evnt,
    });
  } catch (error) {
    next(error);
  }
});

eventRouter.put("/event/:eventid", verifyToken, async (req, res, next) => {
  const { eventid } = req.params;
  const { user_id, event_id, title, description } = req.body;
  const updateFields = {};
  const { id } = req.id;

  if (user_id) {
    updateFields.user_id = user_id;
  }

  if (event_id) {
    updateFields.event_id = event_id;
  }

  if (title) {
    updateFields.title = title;
  }
  if (description) {
    updateFields.description = description;
  }

  console.log(user_id);

  console.log("Update fields lenght: ", updateFields);

  if (id == user_id) {
    try {
      const updatedEVE = await updateEvent(eventid, updateFields);
      console.log("Edited link: ", updatedEVE);
      res.send({
        message: "Event updated",
        data: updatedEVE,
        status: true,
      });
    } catch (error) {
      next(error);
    }
  }
});

eventRouter.post("/newevent", verifyToken, async (req, res, next) => {
  try {
    const { title, description, date, time, location, group_id } = req.body;

    const eventInfo = {
      user_id: req.id.id,
      group_id,
      title,
      description,
      date,
      time,
      location,
    };

    await createEvent(eventInfo);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = eventRouter;
