const Joi = require("joi");

const watchSchema = Joi.object({
  watch: Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().valid("Men", "Women", "Unisex", "Kids").required(),
    features: Joi.array().items(Joi.string()).required(),
    images: Joi.array().items(Joi.string()).required(),
    countInStock: Joi.number().min(0).required(),
  }).required(),
});

const reviewSchema = Joi.object({
  review: Joi.object({
    stars: Joi.number().min(1).max(5).required(),
    comments: Joi.string().min(3).required(),
  }).required(),
});

const userSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  type: Joi.string().valid("Seller", "Consumer", "Administration").required(),
  cart: Joi.array().items(Joi.string()),
});

module.exports = { watchSchema, reviewSchema, userSchema };