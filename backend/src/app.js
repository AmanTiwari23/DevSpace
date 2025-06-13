const express = require("express");

const app = express();

app.use("/",(req,res)=>{
 res.send("this is a home page");
});
app.use("/hello", (req,res)=> {
   res.send("hello from the server");
});
app.use("/test", (req,res)=> {
   res.send("hello from the server");
});
app.listen(7777,()=>{
    console.log("server is listening on port 7777");
});