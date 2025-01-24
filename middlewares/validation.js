const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.email");
};

const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "The name of the item is too short",
      "string.max": "The name of the item is too long",
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
    imageUrl: Joi.string().required().custom(validateUrl),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "The name of the item is too short",
      "string.max": "The name of the item is too long",
    }),
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
    avatar: Joi.string().required().custom(validateUrl),
  }),
});

const validateUserID = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

const validateUserAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().required(),
  }),
});
const validateclothingItemID = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().hex().length(24),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "The name of the item is too short",
      "string.max": "The name of the item is too long",
    }),
    avatar: Joi.string().required().custom(validateUrl),
  }),
});

module.exports = {
  validateclothingItemID,
  validateClothingItem,
  validateUser,
  validateUserAuth,
  validateUserID,
  validateUpdateUser,
};
