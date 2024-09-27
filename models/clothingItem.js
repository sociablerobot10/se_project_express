const mongoose = require("mongoose");

const clothingItemSchema = new mongoose.Schema({
  name: {
    // every user has a name field, the requirements for which are described below:
    type: String,
    required: true, // every user has a name, so it's a required field
    minlength: 2, // the minimum length of the name is 2 characters
    maxlength: 30, // the maximum length is 30 characters
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: {
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  createdAt: {
    required: true,
    type: Date,
    default: Date.now(),
  },
});

const clothing = mongoose.model("Clothing", clothingItemSchema);
module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id); // _id will become accessible
};
module.exports = clothing;
