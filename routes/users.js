const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");

const { validateUpdateUser } = require("../middlewares/validation");

const authorizeUser = require("../middlewares/auth");

router.get("/me", authorizeUser, getCurrentUser);
router.patch("/me", authorizeUser, validateUpdateUser, updateUser);

module.exports = router;
