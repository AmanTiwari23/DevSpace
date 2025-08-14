const express = require("express");
const connectDB = require("./config/database");
const User = require("../models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

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
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){
      res.send("login successful!!!!");
    }else{
      throw new Error("Invalid credentials");
    }

  }catch(err){
    res.status(400).send("ERROR: invalid credentials");
  }
})

app.get("/user", async (req, res) => {
  const useremail = req.body.emailId;
  console.log(useremail);
  try {
    const users = await User.find({ emailId: useremail });

    if (user.length == 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);

    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed){
      throw new Error("update not allowed");
    }
    if(data?.skills.length>10){
      throw new Error("Skills can not be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("user updated");
  } catch (err) {
    res.status(400).send("some thing wrong :" + err.message);
  }
});

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
