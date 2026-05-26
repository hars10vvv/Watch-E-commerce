const express = require("express");
const router = express.Router();
const Watch = require("../models/watch"); // Updated model import
const wrapAsync = require("../utils/wrapAsync");

const {
  validateWatch, // Updated middleware import
  authenticateToken,
  isOwner,
} = require("../utils/middleware");

// Get all watches
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allWatches = await Watch.find({});
    res.status(200).json(allWatches);
  }),
);

// Get a particular watch (with populated reviews and authors)
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const watch = await Watch.findById(id).populate({
      path: "reviews",
      populate: {
        path: "author",
        model: "User",
        select: "username",
      },
    });
    res.status(200).json(watch);
  }),
);

// Create a new watch
router.post(
  "/",
  authenticateToken,
  validateWatch, // Using watch validation
  wrapAsync(async (req, res) => {
    const newWatch = new Watch({ ...req.body.watch }); // Extracting from req.body.watch
    newWatch.owner = req.currUser.id;
    await newWatch.save();
    res.status(201).json({ msg: "Watch Saved successfully", data: newWatch }); // Changed to 201 Created
  }),
);

// Update an existing watch
router.put(
  "/:id", // Removed the trailing slash for cleaner routing
  authenticateToken,
  isOwner,
  validateWatch, // Using watch validation
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Watch.findByIdAndUpdate(id, { ...req.body.watch }); // Extracting from req.body.watch
    res.status(200).json({ msg: "Watch Updated successfully" });
  }),
);

// Delete a watch
router.delete(
  "/:id",
  authenticateToken,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Watch.findByIdAndDelete(id);
    res.status(200).json({ msg: "Watch Deleted successfully" });
  }),
);

module.exports = router;
