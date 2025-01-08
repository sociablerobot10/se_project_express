const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const authorizeUser = require("../middlewares/auth");
const { validateClothingItem } = require("../middlewares/validation");

router.get("/", getClothingItems);

router.post("/", validateClothingItem, authorizeUser, createClothingItem);
router.delete("/:itemId", authorizeUser, deleteClothingItem);
router.put("/:itemId/likes", authorizeUser, likeItem);
router.delete("/:itemId/likes", authorizeUser, dislikeItem);

module.exports = router;
// GET /items — returns all clothing items

// all routes start with /users
