/*
 *
 *
 ------->Title: cors Options
 ->Description: 
 ------>Author: Shawon Talukder
 -------->Date: 02/11/2023
 *
 *
 */
const allowedOrigin = require("./allowedOrigin");

const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
  optionSuccessStatus: 200,
};

module.exports = corsOptions;
