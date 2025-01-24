require("dotenv").config();
//i am not sure what you mean by the key being the same
const { JWT_SECRET = "some-secret-lalal-ff" } = process.env;

module.exports = {
  JWT_SECRET,
};
