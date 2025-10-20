const express = require("express");
const { userAuth } = require("../src/middlewares/auth");
const { validateEditProfileData } = require("../src/utils/validation");
const bcrypt = require("bcrypt")
const validator  = require("validator");

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

profileRouter.patch("/profile/forgetpass", userAuth, async(req,res)=>{
    try{

        const {oldPass,newPass} = req.body;

        if(!oldPass || !newPass){
            throw new Error("Both old and new passwords are required");
        }
        const user = req.user

        const isMatch = await bcrypt.compare(oldPass, user.password);
        if(!ismatch){
            throw new Error("Old password is incorrect");
        }

        if(!validator.isStrongPassword(newPass)){
            throw new Error("Enter a strong password");
        }

        const hashedPass = await bcrypt.hash(newPass,10);
        user.password = hashedPass;
        await user.save();

        res.json({
            message:"Password changed successfully",
        });

    }catch(err){
        res.status(400).send("Error : "+ err.message);
    }
})

module.exports  = profileRouter;