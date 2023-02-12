/*
 *
 *
 ------->Title: user controller
 ->Description: this is to handle all req and response accordingly for /users route
 ------>Author: Shawon Talukder
 -------->Date: 02/12/2023
 *
 *
 */

const User = require("../models/User");
const bcrypt = require("bcrypt");

//model scaffolding
const userController = {};

//model structuring
userController.viewUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length) {
      return res
        .status(200)
        .json({ success: true, length: users.length, users });
    } else {
      return res.status(204).json({ success: true, message: "No data YET!" });
    }
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json({ error: true, message: error.message });
    }
    res.status(500).json({ error: true, message: error.message });
  }
};
//create new user
userController.createUser = async (req, res) => {
  try {
    const { fullname, email, password, phone, role } = req.body;
    if (!fullname || !email || !password || !phone) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are required!" });
    }
    const foundUser = await User.findOne({ $or: [{ phone }, { email }] });
    if (foundUser) {
      return res
        .status(409)
        .json({ error: true, message: "Bad Request!Duplicate user." });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    let userObj;
    if (role) {
      userObj = {
        fullname,
        email,
        phone,
        password: hashPassword,
        role,
      };
    } else {
      userObj = {
        fullname,
        email,
        phone,
        password: hashPassword,
      };
    }
    const newUser = await new User(userObj);

    const result = await newUser.save();
    console.log(result);
    if (result) {
      return res
        .status(201)
        .json({ message: "user created " + result.fullname });
    }
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json({ error: true, message: error.message });
    }
    res.status(500).json({ error: true, message: error.message });
  }
};

//export model
module.exports = userController;
