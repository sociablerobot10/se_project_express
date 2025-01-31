const ForbiddenError = require("../errors/forbiddenError");
const { handleErrors } = require("../middlewares/error-handler");
const clothingItemModel = require("../models/clothingItem");

function getClothingItems(req, res, next) {
  clothingItemModel
    .find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch(next);
}

function deleteClothingItem(req, res, next) {
  const { itemId } = req.params; // the id sent in the url
  // find the clothing item in the database that has itemId
  // then compare the owner field to the id of the user (req.user._id) to see if they are allowed to delete the item
  clothingItemModel
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() === req.user._id) {
        return clothingItemModel
          .findOneAndRemove({ _id: req.params.itemId })
          .orFail()
          .then((user) => res.status(200).send({ user }))
          .catch((err) => handleErrors(err, res, next));
      }

      return next(new ForbiddenError("Forbidden error"));
    })
    .catch((err) => handleErrors(err, res, next));
}

function likeItem(req, res, next) {
  clothingItemModel
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true } // Return the updated document
    )
    .orFail()
    .then((updatedItem) => res.status(200).send(updatedItem))
    .catch((err) => handleErrors(err, res, next));
}
function dislikeItem(req, res, next) {
  clothingItemModel
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // Add user's ID to the likes array if it's not there yet
      { new: true } // Return the updated document
    )
    .orFail()
    .then((updatedItem) => res.send(updatedItem))
    .catch((err) => handleErrors(err, res, next));
}
function createClothingItem(req, res, next) {
  const { name, weather, imageUrl } = req.body;

  clothingItemModel
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((user) => res.status(201).send(user))
    .catch((err) => handleErrors(err, res, next));
}

module.exports = {
  getClothingItems,
  createClothingItem,
  likeItem,
  dislikeItem,
  deleteClothingItem,
};
