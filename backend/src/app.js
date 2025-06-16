const express = require("express");
const connectDB = require("./config/database");

const app = express();

connectDB()
  .then(() => {
    console.log("database connection established...")
    app.listen(7777, () => {
      console.log("server is listening on port 7777");
    });
  })
  .catch((err) => {
    console.log(err);
  });
