const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUserById,
  getCurrentUser,
} = require("../controllers/users");
// all routes start with /users

const authorizeUser = require("../middlewares/auth");
router.get("/", authorizeUser, getUsers);
router.post("/", authorizeUser, createUser);
router.get("/:userId", authorizeUser, getUserById);
router.get("/me", authorizeUser, getCurrentUser);

module.exports = router;
