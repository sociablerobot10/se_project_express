const clothingItemModel = require("../models/clothingItem");
const {
  invalidDataPassError,
  notExistingError,
  defaultError,
  forbiddenError,
} = require("../utils/errors");

function getClothingItems(req, res) {
  clothingItemModel
    .find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch(() =>
      res
        .status(defaultError)
        .send({ message: "An error has occurred on the server" })
    );
}
function deleteClothingItem(req, res) {
  const { owner } = req.body;
  if (owner === req._id) {
    clothingItemModel
      .findOneAndRemove({ _id: req.params.itemId })
      .orFail()
      .then((user) => res.status(200).send(user))
      .catch((err) => {
        if (err.name === "ValidationError" || err.name === "CastError") {
          return res
            .status(invalidDataPassError)
            .send({ message: err.message });
        }
        if (
          err.name === "DocumentNotFoundError" ||
          err instanceof NotFoundError
        ) {
          return res.status(notExistingError).send({ message: err.message });
        }
        return res
          .status(defaultError)
          .send({ message: "An error has occurred on the server" });
      });
  } else {
    return res.status(forbiddenError).send(message);
  }
}
function likeItem(req, res) {
  clothingItemModel
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, // Add user's ID to the likes array if it's not there yet
      { new: true } // Return the updated document
    )
    .orFail()
    .then((updatedItem) => res.status(200).send(updatedItem))
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
function dislikeItem(req, res) {
  clothingItemModel
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // Add user's ID to the likes array if it's not there yet
      { new: true } // Return the updated document
    )
    .orFail()
    .then((updatedItem) => res.send(updatedItem))
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
function createClothingItem(req, res) {
  const { name, weather, imageUrl } = req.body;

  clothingItemModel
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((user) => res.status(201).send(user))
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
  getClothingItems,
  createClothingItem,
  likeItem,
  dislikeItem,
  deleteClothingItem,
};
