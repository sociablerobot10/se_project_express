const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");
// all routes start with /users

const authorizeUser = require("../middlewares/auth");

router.get("/", authorizeUser, getUsers);
router.post("/", authorizeUser, createUser);
router.get("/me", authorizeUser, getCurrentUser);
router.patch("/me", authorizeUser, updateUser);
router.get("/:userId", authorizeUser, getUserById);

module.exports = router;
