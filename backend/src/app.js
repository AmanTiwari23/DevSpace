const express = require("express");
const connectDB = require("./config/database");
const User = require("../models/user");

const app = express();

app.use(express.json());


app.post("/signup", async (req, res) => {

  console.log(req.body);
  const user = new User(req.body);
try{
   await user.save();
  res.send("User added success fully");
}catch (err){
   res.status(400).send("Error saving data" + err.massage)
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


  