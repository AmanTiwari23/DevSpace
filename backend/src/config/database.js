const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://AmanTiwari:U1ug6iM1lg5t8uWs@cluster0.wzrpbn7.mongodb.net/deveSpace"
  );
};

module.exports = connectDB;
