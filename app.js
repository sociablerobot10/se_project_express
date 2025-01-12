const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const { createUser, login } = require("./controllers/users");
const { PORT = 3001 } = process.env;
const mainRouter = require("./routes/index");
const { errorHandler } = require("./middlewares/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { validateUserAuth, validateUser } = require("./middlewares/validation");
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").then(() => {});

app.use("/", express.json());

app.use(cors());
app.use(requestLogger);
app.post("/signin", validateUserAuth, login);
app.post("/signup", validateUser, createUser);
app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(PORT);
});
