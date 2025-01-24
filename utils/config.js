require("dotenv").config();

const { JWT_SECRET = "some-secret-lalal-ff" } = process.env;

module.exports = {
  JWT_SECRET,
};
