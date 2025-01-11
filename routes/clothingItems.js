const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const authorizeUser = require("../middlewares/auth");
const {
  validateClothingItem,
  validateclothingItemID,
} = require("../middlewares/validation");

router.get("/", getClothingItems);

router.post("/", validateClothingItem, authorizeUser, createClothingItem);
router.delete(
  "/:itemId",
  validateclothingItemID,
  authorizeUser,
  deleteClothingItem
);
router.put("/:itemId/likes", validateclothingItemID, authorizeUser, likeItem);
router.delete(
  "/:itemId/likes",
  validateclothingItemID,
  authorizeUser,
  dislikeItem
);

module.exports = router;
// GET /items — returns all clothing items

// all routes start with /users
