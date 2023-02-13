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
const Task = require("../models/Task");
const bcrypt = require("bcrypt");

//model scaffolding
const userController = {};

//model structuring

//view all users
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
        .json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
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
        .json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

//update a user
userController.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, password, role, active } = req.body;
    if (fullname || role || typeof active === "boolean") {
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Something Wrong!" });
      }
      if (fullname) user.fullname = fullname;
      if (role) user.role = role;
      if (typeof active === "boolean") user.active = active;

      //hash the password again
      if (password) {
        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;
      }
      await user.save();
      res.status(200).json({ success: true, message: "User updated!" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "All fields are Required!" });
    }
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

//get information of a @specific_user using id
userController.singleUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Fields required!" });
    }
    const foundUser = await User.findOne({ id }).select("-__v -password");
    if (!foundUser) {
      return res
        .status(400)
        .json({ success: false, message: "Something Wrong" });
    }
    res.status(200).json({ success: true, user_info: foundUser });
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

//delete a user
userController.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await User.findOne({ _id: id });
    if (!findUser) {
      return res
        .status(400)
        .json({ success: false, message: "invalid request!" });
    }
    const task = await Task.findOne({ userId: id });
    if (task) {
      return res
        .status(400)
        .json({ success: false, message: "User has task assigned!" });
    }
    await User.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "Deleted successfully!" });
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

//export model
module.exports = userController;
