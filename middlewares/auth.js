const jwt = require("jsonwebtoken");

const { JWT } = require("../utils/config");

function authorizeUser(req, res, next) {
  const { authorization } = req.headers;
  const regex = /^Bearer /g;

  // we want to check that authorization starts with 'Bearer '
  if (!regex.test(authorization)) {
    return res.status(401).send({ message: "Incorrect authorization header" });
  }
  const token = authorization.replace("Bearer ", "");
  return jwt.verify(token, JWT, (err, payload) => {
    if (err) {
      return res.status(401).send({ message: "Verification failed" });
    }
    req.user = payload;
    next();
  });
}

module.exports = authorizeUser;
