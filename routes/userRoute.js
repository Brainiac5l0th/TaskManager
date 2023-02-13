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
const { checkLogin } = require("../middleware/verifyJWT");

//model scaffolding
const userRouter = express.Router();
userRouter.use(checkLogin);

//@get all users
userRouter.get("/", viewUser);

//@create new user
userRouter.post("/new", createUser);

//@get @specific_user
userRouter.get("/:id",singleUser);

//@update a user
userRouter.patch("/:id", updateUser);

// delete a user
userRouter.delete("/:id", deleteUser);

//export the model
module.exports = userRouter;
