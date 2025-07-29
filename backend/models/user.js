const mongoose = require("mongoose");

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
        if (!value.endsWith("@gmail.com")) {
          throw new Error("not a valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 10,
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
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
    },
    about: {
      type: String,
      default: "this is the default about of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
