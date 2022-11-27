const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const tutorialSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "please proved tutorial title"],
    },

    url: {
      type: String,
      validate: [validator.isURL, "Provide video url"],
      required: [true, "video url required"],
      unique: [true, "This video url exist"],
    },

    addedBy: {
      name: {
        type: String,
        trim: true,
        required: [true, "please proved tutor name"],
      },

      email: {
        type: String,
        required: [true, "please proved tutor email"],
        validate: [validator.isEmail, "Provide a valid Email"],
      },

      id: {
        type: ObjectId,
        ref: "User",
      },
    },

    // course: {
    //   name: {
    //     type: String,
    //     trim: true,
    //     required: [true, "please proved course name"],
    //   },

    //   id: {
    //     type: ObjectId,
    //     ref: "Course",
    //   },
    // },

    status: {
      type: String,
      default: "free",
      enum: ["free", "premium"],
    },

    price: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Tutorial = mongoose.model("Tutorial", tutorialSchema);

module.exports = Tutorial;
