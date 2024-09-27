const clothingItemModel = require("../models/clothingItem");

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

function createClothingItem(req, res) {
  const { name, weatherType, imageURL } = req.body;
  clothingItemModel
    .create({ name, weatherType, imageURL })
    .then((user) => {
      return res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Error creating user");
    });
}

module.exports = { getClothingItems, createClothingItem };
