const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const testimonialSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "please proved rating"],
    },

    description: {
      type: String,
      required: [true, "please proved testimonial description"],
    },

    rivewedBy: {
      name: {
        type: String,
        trim: true,
        required: [true, "please proved name"],
      },

      email: {
        type: String,
        required: [true, "please proved email"],
        validate: [validator.isEmail, "Provide a valid Email"],
      },

      role: {
        type: String,
        required: [true, "please proved role"],
      },

      id: {
        type: ObjectId,
        required: [true, "please proved id"],
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
