const router = require("express").Router();
const { createUser, getUsers, getUserById } = require("../controllers/users");
// all routes start with /users

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:userId", getUserById);
router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});
module.exports = router;
