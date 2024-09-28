const {
  invalidDataPassError,
  notExistingError,
  defaultError,
} = require("../utils/errors");
const userModel = require("../models/user");

function createUser(req, res) {
  const { name, avatar } = req.body;
  userModel
    .create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res.status(invalidDataPassError).send({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(notExistingError).send({ message: err.message });
      }
      if (err.name === "AssertionError") {
        return res.status(notExistingError).send({ message: err.message });
      }
      return res.status(defaultError).send({ message: err.message });
    });
}
function getUsers(req, res) {
  userModel
    .find({})
    .orFail()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res.status(invalidDataPassError).send({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(notExistingError).send({ message: err.message });
      }
      if (err.name === "AssertionError") {
        return res.status(invalidDataPassError).send({ message: err.message });
      }
      return res.status(defaultError).send({ message: err.message });
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
      if (err.name === "AssertionError") {
        return res.status(invalidDataPassError).send({ message: err.message });
      }
      return res.status(defaultError).send({ message: err.message });
    });
}
module.exports = { createUser, getUsers, getUserById };
