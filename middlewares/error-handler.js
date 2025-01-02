const {
  invalidDataPassError,
  notExistingError,
  defaultError,
  conflictError,
  forbiddenError,
  unauthorizedError,
} = require("../utils/errors");
const BadRequestError = require("../errors/badRequestError");
const ForbiddenError = require("../errors/forbiddenError");
const UnAuthorizedError = require("../errors/unauthorizedError");
const NotFoundError = require("../errors/notFoundError");
const ConflictError = require("../errors/conflictError");

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "An error occuried on the server";
  console.error(message, statusCode);
  res.status(statusCode).send(message);

  next();
}

function handleErrors(err, res, next, message) {
  if (err.name === "ValidationError" || err.name === "CastError") {
    //return res.status(invalidDataPassError).send({ message: err.message });
    return next(new BadRequestError(message || err.message));
  }
  if (err.name === "DocumentNotFoundError" || err.name === "NotFoundError") {
    return next(new NotFoundError(message || err.message));
  }
  if (err.name === "ForbiddenError") {
    return next(new ForbiddenError(message || err.message));
  }
  if (err.code === 11000) {
    return next(new ConflictError(message || err.message));
  }
}

module.exports = { errorHandler, handleErrors };
