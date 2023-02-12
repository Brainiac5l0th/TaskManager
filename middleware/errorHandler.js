/*
 *
 *
 ------->Title: 
 ->Description: 
 ------>Author: Shawon Talukder
 -------->Date: 02/11/2023
 *
 *
 */
const createError = require("http-errors");

const notFoundHandler = (req, res, next) => {
    next(createError(404, "Your Requested content is not found"));
};
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  const error =
    process.env.NODE_ENV.trim() === "development"
      ? `${err.message}(${err.status}): ${err.stack}`
      : `${err.message}(${err.status})`;
  res.send({ error });
};

module.exports = { notFoundHandler, errorHandler };
