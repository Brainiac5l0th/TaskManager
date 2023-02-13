/*
 *
 *
 ------->Title: auth file
 ->Description: 
 ------>Author: Shawon Talukder
 -------->Date: 02/12/2023
 *
 *
 */
//dependencies
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");

//model scaffolding
const authController = {};

//model structuring
authController.logIn = async (req, res) => {
  try {
    const { email = "", phone = "", password } = req.body;
    if ((!email && !phone) || !password) {
      return res.status(401).json({ messge: "Authentication Failure!" });
    }
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) {
      return res.status(401).json({ messge: "Authentication Failure!" });
    }
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return res.status(401).json({ messge: "Authentication Failure!" });
    }
    //generate accessToken
    const accessToken = jwt.sign(
      {
        userInfo: { email: user.email, role: user.role },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    //set refreshtoken into cookie
    res.cookie("jwtrefresh", refreshToken, {
      http: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

//export model
module.exports = authController;
