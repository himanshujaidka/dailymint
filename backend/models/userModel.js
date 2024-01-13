const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    age: {
      type: Number,
      required: [true, "Please enter an age"],
    },
    subscriptions: [String],
    interests: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
