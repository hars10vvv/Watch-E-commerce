const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Watch = require("../models/watch");
const wrapAsync = require("../utils/wrapAsync");
const { authenticateToken } = require("../utils/middleware");

// 1. GET User's Cart
// Uses .populate() so the frontend gets the full watch details, not just IDs
router.get(
  "/",
  authenticateToken,
  wrapAsync(async (req, res) => {
    const user = await User.findById(req.currUser.id).populate("cart");
    res.status(200).json({ cart: user.cart });
  })
);

// 2. POST (Add) a Watch to Cart
router.post(
  "/:watchId",
  authenticateToken,
  wrapAsync(async (req, res) => {
    const { watchId } = req.params;
    
    // Quick check to make sure the watch actually exists and is in stock
    const watch = await Watch.findById(watchId);
    if (!watch || watch.countInStock < 1) {
      return res.status(400).json({ msg: "Watch is unavailable or out of stock" });
    }

    // Add the watch ID to the user's cart array
    const user = await User.findById(req.currUser.id);
    user.cart.push(watchId);
    await user.save();

    res.status(200).json({ msg: "Watch added to cart successfully" });
  })
);

// 3. DELETE (Remove) a Watch from Cart
router.delete(
  "/:watchId",
  authenticateToken,
  wrapAsync(async (req, res) => {
    const { watchId } = req.params;
    
    // $pull automatically removes the matching ID from the array
    await User.findByIdAndUpdate(req.currUser.id, { 
      $pull: { cart: watchId } 
    });

    res.status(200).json({ msg: "Watch removed from cart" });
  })
);

module.exports = router;