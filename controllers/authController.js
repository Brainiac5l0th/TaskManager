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
//login functionality
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
    res.cookie("jwt", refreshToken, {
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

//to generate accesstoken again
authController.refresh = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies.jwt) {
      return res.status(401).json({ message: "Authentication Failure!" });
    }
    jwt.verify(
      cookies.jwt,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, data) => {
        if (err) {
          return res.status(401).json({ message: "Authentication Failure!" });
        }
        const { email } = data;
        const user = await User.findOne({ email });

        //new access token
        const newAccessToken = jwt.sign(
          {
            userInfo: {
              email,
              role: user.role,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "5m" }
        );
        return res.status(200).json({access_token: newAccessToken});
      }
    );
  } catch (error) {
    res.status(401).json({ message: "Authentication Failure!" });
  }
};

//logout functionality
authController.logOut = (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) {
    return res
      .status(204)
      .json({ success: false, message: "No content inside." });
  }
  jwt.verify(cookies.jwt, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.status(400).json({ success: false });
    } else {
      //clear cookie for jwt refresh
      res.clearCookie("jwt", { secure: true, http: true, sameSite: "None" });
      return res
        .status(200)
        .json({ success: true, message: "Cookie cleared!" });
    }
  });
};

//export model
module.exports = authController;
