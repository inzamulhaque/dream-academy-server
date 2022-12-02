const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "please proved email"],
      validate: [validator.isEmail, "Provide a valid Email"],
    },

    name: {
      type: String,
      trim: true,
    },

    phone: String,

    subject: {
      type: String,
      required: [true, "please proved subject"],
    },

    message: {
      type: String,
      required: [true, "please proved message"],
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
