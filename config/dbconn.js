/*
 *
 *
 ------->Title: 
 ->Description: this file is to connect with the database
 ------>Author: Shawon Talukder
 -------->Date: 02/11/2023
 *
 *
 */
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (err) {
    console.log("mongoDB error:", err);
  }
};

module.exports = connectDB;
