/*
 *
 *
 ------->Title: Task Controller
 ->Description: this is to handle all req and response accordingly for /tasks route
 ------>Author: Shawon Talukder
 -------->Date: 02/11/2023
 *
 *
 */
//dependencies
const Task = require("../models/Task");
const User = require("../models/User");

//model scaffolding
const taskController = {};

//get all tasks
taskController.viewTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks.length) {
      return res.status(204).json({ message: "No tasks yet!" });
    }
    res
      .status(200)
      .json({ message: "Success!", length: tasks.length, data: tasks });
  } catch (error) {
    res.status(500).json({
      message: "There is a server side problem!",
      error: error.message,
    });
  }
};

//create a task
taskController.postTasks = async (req, res) => {
  try {
    const { email, title, description } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Couldn't create new task" });
    }
    const taskObject = { userId: user._id, title, description };
    const task = new Task(taskObject);
    const savedTask = await task.save();
    if (!savedTask) {
      return res
        .status(400)
        .json({ success: false, message: "Couldn't create new Task" });
    }
    res.status(201).json({ success: true, Task: savedTask });
  } catch (error) {
    res.status(500).json({
      message: "There is a server side problem!",
      error: error.message,
    });
  }
};

//get single task by id
taskController.getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return res
        .status(400)
        .json({ success: false, message: "Task id invalid" });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({
      message: "There is a server side problem!",
      error: error.message,
    });
  }
};

//update a task
taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, title, description, completed } = req.body;
    if (!title || !description || typeof completed !== "boolean") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request!" });
    }
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request!" });
    }
    if (email) {
      const user = await Task.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid request!" });
      }
      task.userId = user._id;
    }
    if (title) task.title = title;
    if (description) task.description = description;
    if (typeof completed === "boolean") task.completed = completed;
    const updatedTask = await task.save();
    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    res.status(500).json({
      message: "There is a server side problem!",
      error: error.message,
    });
  }
};

//delete task
taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.find({ _id: id });
    if (!task) {
      return res
        .status(400)
        .json({ success: false, message: "Can't delete task!" });
    }
    const deletedTask = await Task.deleteOne({ _id: id });
    if (!deletedTask?.deletedCount) {
      return res
        .status(400)
        .json({ success: false, message: "Can't delete task!" });
    }
    res.status(200).json({ success: true, message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = taskController;
