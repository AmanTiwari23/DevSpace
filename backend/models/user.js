const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type:String
    },
    city : String,
    emailId : String,
    age : Number,
    gender:String
});

module.exports = mongoose.model("User",userSchema);

