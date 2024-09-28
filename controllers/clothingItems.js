const clothingItemModel = require("../models/clothingItem");
const {
  invalidDataPassError,
  notExistingError,
  defaultError,
} = require("../utils/errors");

function getClothingItems(req, res) {
  clothingItemModel
    .find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
    });
}
function likeItem(req, res) {
  clothingItemModel
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, // Add user's ID to the likes array if it's not there yet
      { new: true } // Return the updated document
    )
    .then((updatedItem) => res.send(updatedItem))
    .catch((err) => res.status(500).send({ message: err.message }));
}
function dislikeItem(req, res) {
  clothingItemModel
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // Add user's ID to the likes array if it's not there yet
      { new: true } // Return the updated document
    )
    .then((updatedItem) => res.send(updatedItem))
    .catch((err) => res.status(500).send({ message: err.message }));
}
function createClothingItem(req, res) {
  const { name, weather, imageURL } = req.body;

  clothingItemModel
    .create({ name, weather, imageURL, owner: req.user._id })
    .then((user) => {
      return res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name == "ValidationError") {
        console.log(err);
        return res.status(invalidDataPassError).send("Invalid object sent");
      }
    });
}

module.exports = {
  getClothingItems,
  createClothingItem,
  likeItem,
  dislikeItem,
};
