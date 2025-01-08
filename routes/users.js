const router = require("express").Router();
const {
  getCurrentUser,
  updateUser,
  createUser,
} = require("../controllers/users");
// all routes start with /users
const { validateUser } = require("../middlewares/validation");

const authorizeUser = require("../middlewares/auth");

// router.get("/", authorizeUser, getUsers);
router.post("/", validateUser, authorizeUser, createUser);
router.get("/me", authorizeUser, getCurrentUser);
router.patch("/me", authorizeUser, updateUser);
// router.get("/:userId", authorizeUser, getUserById);

module.exports = router;
