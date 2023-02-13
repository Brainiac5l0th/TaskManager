/*
 *
 *
 ------->Title: 
 ->Description: 
 ------>Author: Shawon Talukder
 -------->Date: 02/13/2023
 *
 *
 */

const jwt = require("jsonwebtoken");
const createError = require("http-errors");

//model scaffolding
const verifyJWT = {};

verifyJWT.checkLogin = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization || req.headers.Authorization;
    if (!bearerToken) {
      return res.status(401).json({ message: "Authentication Failure!" });
    }
    if (!bearerToken.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication Failure!" });
    }
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        return res.status(401).json({ message: "Authentication Failure!" });
      }
      req.userInfo = data.userInfo;
      next();
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = verifyJWT;
