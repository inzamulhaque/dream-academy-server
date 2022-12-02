const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "please proved course title"],
      unique: [true, "please proved unique course title"],
    },

    createdBy: {
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
        required: [true, "please proved tutor id"],
        ref: "User",
      },
    },

    status: {
      type: String,
      default: "free",
      enum: ["free", "premium"],
    },

    price: {
      type: Number,
      default: 0,
    },

    tutorials: [
      {
        title: String,

        id: {
          type: ObjectId,
          ref: "Tutorial",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
