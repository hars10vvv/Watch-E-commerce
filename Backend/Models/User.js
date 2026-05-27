const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Seller", "Consumer", "Administration"],
    required: true,
  },
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Watch",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
