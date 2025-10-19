const express = require("express");
const { userAuth } = require("../src/middlewares/auth");
const { validateEditProfileData } = require("../src/utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view",userAuth,(req,res)=>{
    try{
        const user = req.user;
        res.send(user);

    }catch(err){
        res.status(400).send("Error : "+ err.message)
    }
});

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
   try{

    if(!validateEditProfileData(req)){
        throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;
   Object.keys(req.body).forEach((key)=> (loggedInUser[key]=req.body[key]));
    await loggedInUser.save();
    res.json({message: "profile is updated",
        data:loggedInUser
    });

   }catch(err){
    res.status(400).send("ERROR :" + err.message);
   }

});

module.exports  = profileRouter;