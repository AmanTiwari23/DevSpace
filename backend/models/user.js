const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      validate(value) {
        const invalidChars = ["@", "#", "$", "%", "&", "*"];
        for (let char of value) {
          if (invalidChars.includes(char)) {
            throw new Error("Last name should not contain specail charactors");
          }
        }
      },
    },
    city: {
      type: String,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("not a valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
      
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("Enter a strong password");
        }
      }
    },
    age: {
      type: Number,
      validate(value) {
        if (value < 18) {
          throw new Error("not eligibale only 18+ allow");
        }
      },
    },
    gender: {
      type: String,
      enum:{
        values:["male","female","other"],
        message:`{VALUE} is incorrect status type`,
      }
      // validate(value) {
      //   if (!["male", "female", "other"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
        validate(value){
          if(!validator.isURL(value)){
            throw new Error("enter valid url");
          }
        } 
    },
    about: {
      type: String,
      default: "this is the default about of the user",
      maxLength:100
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);



userSchema.methods.getJWT = async function(){
  const user = this;
  const token = await jwt.sign({_id:user._id},"Aman@9589",{expiresIn:"1d"});
  return token;
}


userSchema.methods.validatePassword = async function (passwordInputByuser){
  const user = this;

  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByuser,passwordHash);
  return isPasswordValid
}

module.exports = mongoose.model("User", userSchema);
