const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "please proved blog title"],
    },

    image: {
      type: String,
      required: [true, "please proved blog iamge"],
    },

    description: {
      type: String,
      required: [true, "please proved blog description"],
    },

    cat: {
      type: String,
      required: [true, "please proved blog cat"],
    },

    createBy: {
      name: {
        type: String,
        trim: true,
        required: [true, "please proved bloger name"],
      },

      email: {
        type: String,
        required: [true, "please proved bloger email"],
        validate: [validator.isEmail, "Provide a valid Email"],
      },

      role: {
        type: String,
        required: [true, "please proved bloger role"],
      },

      id: {
        type: ObjectId,
        required: [true, "please proved bloger id"],
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
