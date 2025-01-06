const jwt = require("jsonwebtoken");

const { JWT } = require("../utils/config");

const UnAuthorizedError = require("../errors/unauthorizedError");

function authorizeUser(req, res, next) {
  const { authorization } = req.headers;
  const regex = /^Bearer /g;

  // we want to check that authorization starts with 'Bearer '
  if (!regex.test(authorization)) {
    // return res
    //   .status(unauthorizedError)
    //   .send({ message: "Incorrect authorization header" });
    return next(new UnAuthorizedError("Incorrect authorization header"));
  }
  const token = authorization.replace("Bearer ", "");
  return jwt.verify(token, JWT, (err, payload) => {
    if (err) {
      // return res
      //   .status(unauthorizedError)
      //   .send({ message: "Verification failed" });
      return next(new UnAuthorizedError("Verification failed"));
    }
    req.user = payload;
    return next();
  });
}

module.exports = authorizeUser;
