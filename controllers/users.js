const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  invalidDataPassError,
  notExistingError,
  defaultError,
  conflictError,
  unauthorizedError,
} = require("../utils/errors");
const { handleErrors } = require("../middlewares/error-handler");

const userModel = require("../models/user");
const { JWT } = require("../utils/config");

function createUser(req, res) {
  const { name, email, password, avatar } = req.body;
  userModel
    .findOne({ email })
    .then((user) => {
      if (user) {
        throw new Error("Email taken");
      }
      return bcrypt.hash(password, 10);
    })
    .then((newpwd) =>
      userModel.create({ name, email, password: newpwd, avatar })
    )
    .then(() => res.status(201).send({ name, email, avatar }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(invalidDataPassError).send({ message: err.message });
      }
      if (err.message === "Email taken") {
        return res.status(conflictError).send({ message: err.message });
      }
      return res.status(defaultError).send({ message: err.message });
    });
}

function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(invalidDataPassError)
      .send({ message: "Incorrect username or password" });
  }
  return userModel
    .findUserByCredentials(email, password)
    .then((user) => {
      // authentication successful! user is in the user variable
      const token = jwt.sign({ _id: user._id }, JWT, {
        expiresIn: "7d",
      });
      res.setHeader("Content-Type", "application/json");
      return res.status(200).send({
        token,
        user: {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          _id: user._id,
        },
      });
    })
    .catch((err) => {
      /*      if (
        err.name === "ValidationError" ||
        err.name === "CastError" ||
        err.name === "AssertionError" ||
        err.name === "SyntaxError" ||
        err.name === "TypeError" ||
        err.name === "RangeError"
      ) {
        return res.status(invalidDataPassError).send({ message: err.message });
      } */
      if (err.message === "Incorrect email or password") {
        return res.status(unauthorizedError).send({ message: err.message });
      }
      return res
        .status(defaultError)
        .send({ message: "An error occurred on the server" });
    });
}

function updateUser(req, res) {
  const { name, avatar } = req.body;

  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, avatar }, // Add user's ID to the likes array if it's not there yet
      { new: true, runValidators: true } // Return the updated document
    )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(invalidDataPassError).send({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(notExistingError).send({ message: err.message });
      }

      return res
        .status(defaultError)
        .send({ message: "An error has occurred on the server" });
    });
}

function getCurrentUser(req, res) {
  userModel
    .findById(req.user._id)
    .then((user) => {
      const { _id, email, avatar, name } = user;
      res.status(200).send({
        _id,
        email,
        avatar,
        name,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(invalidDataPassError).send({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(notExistingError).send({ message: err.message });
      }

      return res
        .status(defaultError)
        .send({ message: "An error has occurred on the server" });
    });
}

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
