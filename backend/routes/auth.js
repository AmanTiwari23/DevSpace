const express = require("express");
const authRouter = express.Router();
const {validateSignupData} = require("../src/utils/validation")
const bcrypt = require("bcrypt");
const User = require("../models/user")

authRouter.post("/signup", async (req,res)=>{
    try{
           validateSignupData(req);

           const {firstName,lastName,emailId,password} = req.body;

           const hashPassword =await bcrypt.hash(password,10)
           
           const user = new User({
            firstName,
            lastName,
            emailId,
            password:hashPassword
           });

           await user.save();

           res.send("user added successfully")

    }catch(err){
        res.status(400).send("Error : "+ err.message);
    }
});


authRouter.post("/login", async(req,res)=>{
    try{

        const {emailId,password} = req.body;
        const user = await User.findOne({emailId:emailId});

        if(!user){
            throw new Error("Invalid cridentials");
        }

        const isPasswordValid = await user.validatePassword(password)
        if(isPasswordValid){
                const token = await user.getJWT();
                 res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)});
                       res.send("Login successfull");
        }else{
            throw new Error("invalid ")
        }


    }catch(err){
        res.status(400).send("ERROR : "+ err.message);
    }
});

authRouter.post("/logout", async (req,res)=>{
     res.cookie("token",null, {
        expires:new Date(Date.now()),
     });
     res.send("Logout successful!!!");
});

module.exports = authRouter;