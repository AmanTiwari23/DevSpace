const express = require("express");
const { userAuth } = require("../src/middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");

const userRouter = express.Router();


userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status:"interested",
        }).populate("fromUserId","firstName lastName  age gender about skills");

        res.json({
            message:"Data fetched successfully",
            data:connectionRequests
        })

    }catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
}); 


module.exports = userRouter;