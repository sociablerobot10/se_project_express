const router = require("express").Router();
router.get("/", (req, res) => {
  console.log("GET ITEMS");
});
router.post("/", (req, res) => {
  const { name, weatherType, imageURL } = req.body;
  return res.status(200).send("post successful");
});
router.delete("/", (_id) => {
  console.log("DELETE USERS");
});

module.exports = router;
//GET /items — returns all clothing items
