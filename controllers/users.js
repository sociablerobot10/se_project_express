const {
  invalidDataPassError,
  notExistingError,
  defaultError,
} = require("../utils/errors");
const userModel = require("../models/user");

function createUser(req, res) {
  const { name, avatar } = req.body;
  userModel
    .create({ name: name, avatar: avatar })
    .then((user) => {
      return res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Error creating user");
    });
}
function getUsers(req, res) {
  userModel
    .find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      if (err.name == "ValidationError") {
        console.log(err);
        return res.status(invalidDataPassError).send("Invalid object sent");
      }
    });
}

module.exports = { createUser, getUsers };
