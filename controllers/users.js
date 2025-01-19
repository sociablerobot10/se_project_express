const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { invalidDataPassError } = require("../utils/errors");
const { handleErrors } = require("../middlewares/error-handler");

const userModel = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

function createUser(req, res, next) {
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
    .catch((err) => handleErrors(err, res, next));
}
function login(req, res, next) {
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
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
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
    .catch((err) => handleErrors(err, res, next));
}

function updateUser(req, res, next) {
  const { name, avatar } = req.body;

  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, avatar }, // Add user's ID to the likes array if it's not there yet
      { new: true, runValidators: true } // Return the updated document
    )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => handleErrors(err, res, next));
}

function getCurrentUser(req, res, next) {
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
    .catch((err) => handleErrors(err, res, next));
}

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
