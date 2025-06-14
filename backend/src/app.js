const express = require("express");

const app = express();


app.get("/abc", (req, res) => {
  console.log(req.params);
  res.send({
    firstname:"aman",
    lastname:"tiwari"
  });

});
app.post("/user", (req, res) => {
  res.send("data has save successfully");
});
app.delete("/user", (req, res) => {
  res.send("user deleted");
});

app.listen(7777, () => {
  console.log("server is listening on port 7777");
});
