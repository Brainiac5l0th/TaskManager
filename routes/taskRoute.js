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
const { getTasks, postTasks } = require("../controllers/taskController");

const taskRouter = express.Router();

//get all tasks
taskRouter.get("/", getTasks);

//post a task
taskRouter.post("/", postTasks);

//get a task by id
// taskRouter.post("/id/:id");

module.exports = taskRouter;
