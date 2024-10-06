const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  invalidDataPassError,
  notExistingError,
  defaultError,
  conflictError,
} = require("../utils/errors");

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
      if (
        !name ||
        !email ||
        !password ||
        !avatar ||
        err.name === "ValidationError" ||
        err.name === "CastError" ||
        err.name === "AssertionError" ||
        err.name === "SyntaxError" ||
        err.name === "TypeError" ||
        err.name === "RangeError"
      ) {
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

  return userModel
    .findUserByCredentials({ email })
    .select("+password")
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT, {
        expiresIn: "7d",
      });
      return token;
      // authentication successful! user is in the user variable
    })
    .then((token) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send({ token });
    })
    .catch((err) => {
      if (
        !email ||
        !password ||
        err.name === "ValidationError" ||
        err.name === "CastError" ||
        err.name === "AssertionError" ||
        err.name === "SyntaxError" ||
        err.name === "TypeError" ||
        err.name === "RangeError"
      ) {
        return res.status(invalidDataPassError).send({ message: err.message });
      }
      // authentication error
      res.status(401).send({ message: err.message });
    });
}
function getUsers(req, res) {
  userModel
    .find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() =>
      res
        .status(defaultError)
        .send({ message: "An error has occurred on the server" })
    );
}
function updateUser(req, res) {
  const { name, avatar } = req.body;
  if (name && avatar) {
    userModel
      .findByIdAndUpdate(
        req.user._id,
        { name, avatar }, // Add user's ID to the likes array if it's not there yet
        { new: true, runValidators: true } // Return the updated document
      )
      .orFail()
      .then(() => {
        res.status(200).send(name, avatar);
      })
      .catch((err) => {
        if (
          err.name === "AssertionError" ||
          err.name === "ValidationError" ||
          err.name === "CastError"
        ) {
          return res
            .status(invalidDataPassError)
            .send({ message: err.message });
        }
        if (err.name === "DocumentNotFoundError") {
          return res.status(notExistingError).send({ message: err.message });
        }

        return res
          .status(defaultError)
          .send({ message: "An error has occurred on the server" });
      });
  }
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
      if (
        err.name === "ValidationError" ||
        err.name === "AssertionError" ||
        err.name === "CastError"
      ) {
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
function getUserById(req, res) {
  userModel
    .findById(req.params.userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
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
  getUsers,
  getUserById,
  login,
  getCurrentUser,
  updateUser,
};
