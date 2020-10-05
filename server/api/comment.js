const express = require("express");
const commentRouter = express.Router();
const { verifyToken } = require("./utils");
const {
createComment,
getAllComments,
getCommentEventId,
getEventById

} = require('../db');



commentRouter.use((req, res, next) => {
  console.log("A request is being made to /comment");
  next();
});


commentRouter.get('/allcommentsforeevnt', async(req, res, next) => {

   
    
  try {
      const comment = await getAllComments()

      res.send({
         comment
      })
  } catch (error) {
      next(error);
  }
});


commentRouter.get("/eventcomments/:userId", async (req, res, next) => {
  const {userId}  = req.params

  try {
    const eventComment = await getCommentEventId(userId);

    if (!eventComment) {
      return res.status(404).json({
        error: `No user found with Id: ${userdId}`
      });
    }

    res.send({
      eventComment
    });
  } catch (error) {
    throw error;
  }
});




commentRouter.patch("/:commentId", verifyToken, async (req, res, next) => {
    const { commentId } = req.params;
    const { userId, name, message} = req.body;
    const updateFields = {};
  
    if (userId) {
      updateFields.userId = userId;
    }
  
    if (name) {
      updateFields.name = name;
    }
  
    if (message) {
      updateFields.message = message;
    }
  
    try {
      const commentByID = await getEventById(commentId);
  
      if (commentByID) {
        const updateComment = await updateComment(commentId, updateFields);
        res.send({ event: updateComment });
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
  


commentRouter.post("/newcomment", verifyToken, async (req, res, next) => {
  try {

    
    const {
      event_id,
      message,
      name
    } = req.body;

    const eventInfo = {
      event_id,
      user_id: req.id.id,
      message,
      name
    };

    await createComment(eventInfo);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = commentRouter;
