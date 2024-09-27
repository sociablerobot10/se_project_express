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
      console.error("Error fetching users:", err);
    });
}

module.exports = { createUser, getUsers };
