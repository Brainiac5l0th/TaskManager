/*
 *
 *
 ------->Title: 
 ->Description: 
 ------>Author: Shawon Talukder
 -------->Date: MM/DD/2023
 *
 *
 */

const express = require("express");
const {
  viewUser,
  createUser,
  singleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const userRouter = express.Router();

//@get all users
userRouter.get("/", viewUser);

//@get @specific_user
userRouter.get("/:id", singleUser);

//@create new user
userRouter.post("/new", createUser);

//@update a user
userRouter.patch("/:id", updateUser);

// delete a user
userRouter.delete("/:id", deleteUser);

//export the model
module.exports = userRouter;
