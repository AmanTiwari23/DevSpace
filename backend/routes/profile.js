const express = require("express");
const { userAuth } = require("../src/middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile",userAuth,(req,res)=>{
    try{
        const user = req.user;
        res.send(user);

    }catch(err){
        res.status(400).send("Error : "+ err.message)
    }
});

module.exports  = profileRouter;