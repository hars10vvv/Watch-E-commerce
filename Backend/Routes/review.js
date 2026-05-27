const express = require("express");
const router = express.Router({ mergeParams: true });
const Watch = require("../models/watch"); // Updated to Watch model
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, authenticateToken, isReviewAuthor } = require("../utils/middleware");

// Create a new review for a watch
router.post(
  "/",
  authenticateToken,
  validateReview,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updateWatch = await Watch.findById(id); // Updated variable
    
    // Safety check: Ensure the watch actually exists before adding a review
    if (!updateWatch) {
      return res.status(404).json({ msg: "Watch not found" });
    }

    const newReview = new Review({ ...req.body.review });
    newReview.author = req.currUser.id;
    await newReview.save();
    
    updateWatch.reviews.push(newReview); // Pushing to watch
    await updateWatch.save();
    
    res.status(201).json({ 
      msg: "Review Saved", 
      author: req.currUser.username, 
      review: newReview 
    }); // Changed to 201 Created
  }),
);

// Delete a specific review
router.delete(
  "/:reviewId",
  authenticateToken,
  isReviewAuthor,
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    
    // Pull the review ID out of the Watch's reviews array
    await Watch.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Updated to Watch
    
    // Delete the actual review document
    await Review.findByIdAndDelete(reviewId);
    
    res.status(200).json({ msg: "Review Deleted" });
  }),
);

module.exports = router;