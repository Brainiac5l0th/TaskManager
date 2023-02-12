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
const path = require("path");

const publicRouter = express.Router();

publicRouter.get("^/$|/index(.html)?", (req, res) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(`${__dirname}/../views/index.html`));
  } else {
    res.status(200).json({ message: "This is TaskManager's api page." });
  }
});

module.exports = publicRouter;
