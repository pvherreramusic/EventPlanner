const express = require("express");
const groupRouter = express.Router();
const { verifyToken } = require("./utils");
const {
  getAllGroup,
  getGroupById,
  createGroup,
  getSelectedGroup,
  createUG,
  getUserGroupById

} = require('../db');


groupRouter.use((req, res, next) => {
    console.log("A request is being made to /group");
    next();
  });

groupRouter.get('/allgroups', async(req, res, next) => {
    try {
        const groups = await getAllGroup();

        res.send({
           groups
        })
    } catch (error) {
        next(error);
    }
});

groupRouter.get(`/selectedgroup/:groupid`, async(req, res, next) => {
  
  const {groupid} = req.params
 
  try {
      const selected = await getSelectedGroup(groupid);

      res.send({
         selected
      })
  } catch (error) {
      next(error);
  }
});

groupRouter.get("/:userId/group", async (req, res, next) => {
  const {userId}  = req.params

  try {
    const group = await getGroupById(userId);

    if (!group) {
      return res.status(404).json({
        error: `No user found with Id: ${userId}`
      });
    }
    console.log({group})
    res.send({
      group
    });
  } catch (error) {
    throw error;
  }
});

  groupRouter.post("/newgroup", verifyToken, async (req, res, next) => {
    try {
  
  
      const {
        group_name,
        description
       
      } = req.body;
  
      const groupInfo = {
        group_name,
        description,
        user_id:req.id.id,
        

       
      };
  
      await createGroup(groupInfo);
  
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  });


  groupRouter.post("/usergroup", verifyToken, async (req, res, next) => {
    try {
  
  
      const {
        group_id
        
       
      } = req.body;
  
      const groupInfo = {
        user_id: req.id.id,
        group_id

       
      };
  
      await createUG(groupInfo);
  
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  });


  groupRouter.get("/:userId/usergroup", async (req, res, next) => {
    const {userId}  = req.params
  
    try {
      const group = await getUserGroupById(userId);
  
      if (!group) {
        return res.status(404).json({
          error: `No user found with Id: ${userId}`
        });
      }
      console.log({group})
      res.send({
        group
      });
    } catch (error) {
      throw error;
    }
  });
  


  module.exports = groupRouter;