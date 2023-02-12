/*
 *
 *
 ------->Title: server file
 ->Description: this is the server file for the backend/api of this project
 ------>Author: Shawon Talukder
 -------->Date: 02/11/2023
 *
 *
 */

//dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

//internal dependencies
const corsOptions = require("./config/corsOpt");
const connectDB = require("./config/dbconn");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");
const publicRoute = require("./routes/publicRoute");
const authRoute = require("./routes/authRoute");
const taskRoute = require("./routes/taskRoute");
const userRoute = require("./routes/userRoute");
//model scaffolding
const app = express();

//configuration
dotenv.config();
const port = process.env.PORT || 5001;
connectDB();

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//for using static files
app.use("/", express.static(path.join(__dirname, "public")));

//routes
app.use("/", publicRoute);
app.use("/users", userRoute);
app.use("/tasks", taskRoute);
app.use("/auth", authRoute);

//errorhandler
app.use(notFoundHandler);
app.use(errorHandler);

//mongo connection check
mongoose.connection.on("open", () => {
  console.log("Database connected!");
  app.listen(port, () => {
    console.log(`Port Listening on: ${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(`error in database: ${err}`);
});
