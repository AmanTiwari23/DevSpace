const express = require("express");
const { userAuth } = require("../src/middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res)=>{
  try{

    const toUserId = req.params.toUserId;
    const fromUserId = req.user._id;
    const status = req.params.status;

    const allowedStatus = ["ignored","interested"];

    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"invalid status type: "+ status});
    }


    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or:[
        {fromUserId,toUserId,},
        {fromUserId:toUserId,toUserId:fromUserId},
      ],
    })

    if(existingConnectionRequest){
      return res.status(400).json({message:"request alredy exist"})
    }

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
