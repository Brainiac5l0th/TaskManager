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

//model scaffolding
const taskController = {};

taskController.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().select(" -__v").exec();
    if (tasks.length) {
      return res
        .status(200)
        .json({ message: "Success!", length: tasks.length, data: tasks });
    } else {
      return res.status(204).json({ message: "No Tasks Yet!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "There is a server side problem!",
      error: error.message,
    });
  }
};

taskController.postTasks = async (req, res) => {
  try {
    const { title, description } = req.body;
    const taskObject = { title, description };
    const task = new Task(taskObject);
    await task.save();
    if (task) {
      return res.status(201).json({ message: `Task created!`, task });
    }
  } catch (error) {
    res.status(500).json({
      message: "There is a server side problem!",
      error: error.message,
    });
  }
};

module.exports = taskController;
