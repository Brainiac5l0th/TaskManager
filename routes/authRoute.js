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

const { logIn, logOut, refresh } = require("../controllers/authController");

//model scaffolding
const authRouter = express.Router();

//login authentication
authRouter.post("/", logIn);

//logout functionality
authRouter.post("/logout", logOut);

//refresh token send
authRouter.get("/refresh", refresh);

//model export
module.exports = authRouter;
