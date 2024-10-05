const { JWT } = require("../utils/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function authorizeUser(req, res, next) {
  const { authorization } = req.headers;
  const regex = /^Bearer /g;

  //we want to check that authorization starts with 'Bearer '
  if (!regex.test(authorization)) {
    return res.status(401).send({ message: "Incorrect authorization header" });
  } else {
    const token = authorization.replace("Bearer ", "");
    return jwt.verify(token, JWT, function (err, payload) {
      if (err) {
        return res.status(401).send({ message: "Verification failed" });
      }
      req.user = JSON.stringify(payload);
      next();
    });
  }
}

module.exports = authorizeUser;
