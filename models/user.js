const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    // every user has a name field, the requirements for which are described below:
    type: String,
    required: true, // every user has a name, so it's a required field
    minlength: 2, // the minimum length of the name is 2 characters
    maxlength: 30, // the maximum length is 30 characters
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
