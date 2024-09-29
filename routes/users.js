const router = require("express").Router();
const { createUser, getUsers, getUserById } = require("../controllers/users");
// all routes start with /users

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:userId", getUserById);

module.exports = router;
