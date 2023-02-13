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
//dependencies
const express = require("express");

const {logIn} = require("../controllers/authController");
//model scaffolding
const authRouter = express.Router();

authRouter.post("/", logIn);

module.exports = authRouter;
