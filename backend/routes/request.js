const express = require("express");
const { userAuth } = require("../src/middlewares/auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req,res)=>{
  const user = req.user;
  console.log("sending connection request");
  res.send(user.firstName + " is Sending connection request");
   
});

module.exports = requestRouter;
