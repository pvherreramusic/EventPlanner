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
  
  
  
} = require('../db');




eventRouter.use((req, res, next) => {
  console.log("A request is being made to /event");
  next();
});



eventRouter.get('/allevents', async(req, res, next) => {
  try {
      const events = await getAllEvents();

      res.send({
         events
      })
  } catch (error) {
      next(error);
  }
});


eventRouter.get("/event/:eventid", async (req, res, next) => {
  
  const {eventid} = req.params

  try {
    const userEvent = await getEventByUserId(eventid);

    if (!userEvent) {
      return res.status(404).json({
        error: `No user found with Id: ${userId}`
      });
    }

    res.send({
      userEvent
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

eventRouter.get('/bygroup/:groupid',async(req, res, next) => {

  const { groupid } = req.params;
  
 
  try {
    
    const evnt = await getEventByGroupId(groupid);
    
    if (!evnt) {
      return res.status(404).json({
        error: `No user found with Id: ${groupid}`
      });
    }

    res.send({
      evnt
    });
  } catch (error) {
    next(error);
  }
});


eventRouter.patch("/:eventId", verifyToken, async (req, res, next) => {
  const { eventId } = req.params;
  const { userId, title, description} = req.body;
  const updateFields = {};

  if (userId) {
    updateFields.userId = userId;
  }

  if (price) {
    updateFields.title = title;
  }

  if (quantity) {
    updateFields.description = description;
  }

  try {
    const eventByID = await getEventById(eventId);

    if (eventByID) {
      const updatedEvent = await updateEvent(eventId, updateFields);
      res.send({ event: updatedEvent });
    } else {
      next({
        name: "UpdateEventError",
        description: "Error updating Event",
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});


eventRouter.post("/newevent", verifyToken, async (req, res, next) => {

  try {
    const {
      title,
      description,
      date,
      time,
      location,
      group_id,
      
      
      
    } = req.body;

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
