const express = require("express");

const app = express();

app.use("/user",(req,res,next)=> {
  next();
  console.log("1 responce")
},(req,res,next)=>{

  next();
   res.send("2nd responce");
  console.log("2nd responce run");
},(req,res)=> {
  res.send("3rd responce");
},(req,res)=>{
  res.send("4 responce");
})

// app.get("/abc", (req, res) => {
//   console.log(req.params);
//   res.send({
//     firstname:"aman",
//     lastname:"tiwari"
//   });

// });
// app.post("/user", (req, res) => {
//   res.send("data has save successfully");
// });
// app.delete("/user", (req, res) => {
//   res.send("user deleted");
// });

app.listen(7777, () => {
  console.log("server is listening on port 7777");
});
