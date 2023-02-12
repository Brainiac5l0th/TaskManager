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
const { viewUser, createUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", viewUser);
userRouter.post("/new", createUser);

module.exports = userRouter;
