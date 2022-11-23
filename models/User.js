const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please proved user name"],
    },

    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      required: [true, "Email address is required"],
      lowercase: true,
      unique: [true, "This email already exist"],
    },

    phone: String,

    role: {
      type: String,
      enum: ["student", "mentor", "admin"],
      default: "student",
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    status: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive", "blocked"],
    },

    verificationToken: {
      type: String,
      unique: true,
      required: true,
    },

    tokenExpire: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
