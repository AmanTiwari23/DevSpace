const express = require("express");
const { userAuth } = require("../src/middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res)=>{
  try{

    const toUserId = req.params.toUserId;
    const fromUserId = req.user._id;
    const status = req.params.status;

    const connectionRequest  = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    });

    const data = await connectionRequest.save();

    res.json({
      message:"Connection Request sent successfully!",
      data,
    });

  }catch(err){
    res.status(400).send("ERROR : "+ err.message);
  }
 
   
});

module.exports = requestRouter;
