const express = require("express");
const { userAuth } = require("../src/middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const requestRouter = express.Router();

const User = require("../models/user");


requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res)=>{
  try{

    const toUserId = req.params.toUserId;
    const fromUserId = req.user._id;
    const status = req.params.status;

    const allowedStatus = ["ignored","interested"];

    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"invalid status type: "+ status});
    }
   
    const toUser = await User.findById(toUserId);
    if(!toUser){
      return res.status(404).json({message:"User not found!"});
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
      message:req.user.firstName+"is"+status+toUser.firstName,
      data,
    });

  }catch(err){
    res.status(400).send("ERROR : "+ err.message);
  }
 
   
});

module.exports = requestRouter;
