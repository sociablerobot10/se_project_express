const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
} = require("../controllers/clothingItems");
router.get("/", getClothingItems);

router.post("/", createClothingItem);
router.delete("/", (_id) => {
  console.log("DELETE USERS");
});

module.exports = router;
//GET /items — returns all clothing items

// all routes start with /users
