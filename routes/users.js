const router = require("express").Router();
const { createUser, getUsers } = require("../controllers/users");
// all routes start with /users

router.get("/", getUsers);
router.post("/", createUser);
router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});
module.exports = router;
