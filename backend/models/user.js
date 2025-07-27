const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required:true,
        minLength:4,
        maxLength:100
    },
    lastName : {
        type:String
    },
    city : {
      type:  String
    },
    emailId :{
      type:  String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true

    },
    password:{
      type:  String,
      required:true,
      minLength:4,
        maxLength:10
    },
    age : {
      type: Number,
      min:18
    },
    gender:{
      type:  String,
      validate(value){
        if(!["male","female","other"].includes(value)){
            throw new Error("Gender data is not valid");
        }
      }
    },
    photoUrl:{
        type:String,
        default:"https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
    },
    about: {
      type:String,
      default:"this is the default about of the user"

    },
    skills:{
        type:[String]
    }
});

module.exports = mongoose.model("User",userSchema);

