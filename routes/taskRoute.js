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
const {
  viewTasks,
  postTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const taskRouter = express.Router();

//get all tasks
taskRouter.get("/", viewTasks);

//post a task
taskRouter.post("/new", postTasks);

//get single task
taskRouter.get("/:id", getSingleTask);

//get a task by id
taskRouter.patch("/:id", updateTask);

//delete task by id
taskRouter.delete("/:id", deleteTask);

module.exports = taskRouter;
