const router = require("express").Router();
const { createUser, getUsers } = require("../controllers/users");
// all routes start with /users

router.get("/", getUsers);
router.post("/", createUser);

module.exports = router;
