const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const mainRouter = require("./routers/index");
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").then(() => {
  console.log("connected");
});
app.use("/", mainRouter);
app.listen(PORT, () => {
  console.log("PORT IS LISTENING");
});
