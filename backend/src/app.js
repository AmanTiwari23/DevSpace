const express = require("express");
const  {adminAuth, userAuth} = require("./middlewares/auth");
const app = express();

app.use("/admin",adminAuth);

app.use("/user",userAuth);

app.get("/admin/getAllData",(req,res)=>{
   res.send("All data sent");
})

app.get("/admin/deleteData",(req,res)=>{
  res.send("Deleted a user");
})

app.get("/user/login",(req,res)=>{
  res.send("user logedin successfuly");
})
app.listen(7777, () => {
  console.log("server is listening on port 7777");
});
