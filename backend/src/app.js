const express = require("express");
const connectDB = require("./config/database");
const User = require("../models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth")

const app = express();


app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
try{
  // validation of data
  validateSignupData(req);

  const {password,firstName,lastName,emailId} = req.body;
// encrypt the password
  const hashPassword = await bcrypt.hash(password,10)
  console.log(hashPassword);

  // creating a new instance of the user model
  const user =new User({
    firstName,
    lastName,
    emailId,
    password:hashPassword
  });
  await user.save();
  res.send("user Added successfully");
   
}catch(err){
    res.status(400).send("ERROR : "+ err.message);
}
});

app.post("/login", async (req,res)=>{
  try{
    const {emailId,password} = req.body;

    const user = await User.findOne({emailId : emailId});
    if(!user){
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if(isPasswordValid){

      //create jwt token 

      const token = await user.getJWT();

      res.cookie("token",token,{
        expires:new Date(Date.now()+ 1*3600000)
      });

      res.send("login successful!!!!");
    }else{
      throw new Error("Invalid credentials");
    }

  }catch(err){
    res.status(400).send("ERROR: invalid credentials");
  }
})

app.get("/profile", userAuth, async(req,res)=>{
    try{
     const user = req.user

     res.send(user);

    }catch(err){
      res.status(400).send("ERROR : " + err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, async (req,res)=>{
  const user = req.user;
  console.log("sending connection request");
  res.send(user.firstName + " is Sending connection request");
   
})


connectDB()
  .then(() => {
    console.log("database connection established...");
    app.listen(7777, () => {
      console.log("server is listening on port 7777");
    });
  })
  .catch((err) => {
    console.log(err);
  });
