const router = require("express").Router();
router.get("/", () => {
  console.log("GET USERS");
});
router.get("/:userId", () => {
  console.log("GET USER ID");
});
router.post("/", () => {
  console.log("POST USERS");
});

module.exports = router;
