const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
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

module.exports = { validateClothingItem };
