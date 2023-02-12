/*
 *
 *
 ------->Title: user model
 ->Description: this file is to handle user related schema
 ------>Author: Shawon Talukder
 -------->Date: 02/11/2023
 *
 *
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: Array,
      enum: ["Admin", "Manager", "Employee"],
      default: "Employee",
    },
    active: {
      type: Boolean,
      default: true,
    },
    taskId: {
      type: mongoose.Types.ObjectId,
      ref: "Task",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
