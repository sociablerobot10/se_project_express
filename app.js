const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const mainRouter = require("./routers/index");
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").then(() => {
  console.log("connected");
});

app.use("/", express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "66f6022b4ecca0146f5db202", // paste the _id of the test user created in the previous step
  };
  next();
});
app.use("/", mainRouter);
app.listen(PORT, () => {
  console.log("PORT IS LISTENING");
});
