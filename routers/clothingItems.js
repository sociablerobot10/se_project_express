const router = require("express").Router();
router.get("/items", () => {
  console.log("GET ITEMS");
});
router.post("/items", (item_name, weatherType, imageUrl) => {
  console.log("POST USER ID");
});
router.delete("/", (_id) => {
  console.log("DELETE USERS");
});

module.exports = router;
//GET /items — returns all clothing items
