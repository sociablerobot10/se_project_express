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
    weather: Joi.string().required(),
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
  }),
});

const validateUserID = celebrate({
  params: Joi.object().keys({
    id: Joi.hex().required().length(24),
  }),
});
const validateclothingItemID = celebrate({
  params: Joi.object().keys({
    id: Joi.hex().required().length(24),
  }),
});

module.exports = { validateClothingItem, validateUser };