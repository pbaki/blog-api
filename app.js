var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var blogRouter = require("./routes/blog");
var usersRouter = require("./routes/users");
var commentsRouter = require("./routes/comments");

var app = express();

app.use(express.json());

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connencted to DB");
}

app.use("/", blogRouter);
app.use("/", usersRouter);
app.use("/", commentsRouter);

module.exports = app;
