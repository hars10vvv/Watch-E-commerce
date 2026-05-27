const { watchSchema, reviewSchema, userSchema } = require("./Schema");
const User = require("../models/user");
const Watch = require("../models/watch"); // Updated to Watch
const wrapAsync = require("./wrapAsync");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const Review = require("../models/review");

module.exports.validateWatch = (req, res, next) => {
  const { error } = watchSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((detail) => detail.message);
    const fullErrorMessage = messages.join("; ");
    const msg = fullErrorMessage.replaceAll("watch.", ""); // Updated replacer
    return next(createError(400, msg));
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((detail) => detail.message);
    const fullErrorMessage = messages.join("; ");
    const msg = fullErrorMessage.replaceAll("review.", "");
    return next(createError(400, msg));
  }
  next();
};

module.exports.validateUser = wrapAsync(async (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((detail) => detail.message);
    const fullErrorMessage = messages.join("; ");
    return next(createError(400, fullErrorMessage));
  }
  const { username } = req.body;
  const userExist = await User.findOne({ username: username });
  if (userExist) {
    return next(createError(400, "Username Already Exist"));
  }
  next();
});

module.exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(createError(401, "Access Denied : Please log in first"));
  }
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.currUser = verify;
    next();
  } catch (err) {
    return next(createError(403, "Invalid or Expired token"));
  }
};

module.exports.isOwner = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const watch = await Watch.findById(id); // Updated to Watch
  if (!watch) {
    return next(createError(404, "Watch not found")); // Updated error
  }
  if (watch.owner.equals(req.currUser.id)) {
    return next();
  }
  return next(createError(403, "Forbidden error"));
});

module.exports.isReviewAuthor = wrapAsync(async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review) {
    return next(createError(404, "Review not found"));
  }
  if (review.author.equals(req.currUser.id)) {
    return next();
  }
  return next(createError(403, "Forbidden error"));
});
