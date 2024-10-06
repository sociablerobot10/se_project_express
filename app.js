const express = require("express");
const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const { createUser, login } = require("./controllers/users");

const { PORT = 3001 } = process.env;
const mainRouter = require("./routes/index");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").then(() => {});

app.use("/", express.json());
// app.use((req, res, next) => {
//   req.user = {
//     _id: "66f6022b4ecca0146f5db202", // paste the _id of the test user created in the previous step
//   };
//   next();
// });

app.use(cors());
app.post("/signin", login);
app.post("/signup", createUser);
app.use("/", mainRouter);

app.listen(PORT, () => {});
