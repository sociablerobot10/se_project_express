const router = require("express").Router();
const { notExistingError } = require("../utils/errors");
const userRouter = require("./users");
const itemRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use((req, res) => {
  res
    .status(notExistingError)
    .send({ message: "Requested resource not found" });
});
module.exports = router;
