const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { validateUser, authenticateToken } = require("../utils/middleware");

// SMART COOKIE CONFIG:
// Automatically handles Localhost (lax/http) vs Production (none/https)
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
};

router.post(
  "/signup",
  validateUser,
  wrapAsync(async (req, res) => {
    // CRITICAL FIX: Added 'type' to destructuring to match your User model
    const { username, email, password, type } = req.body;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
      type: type, // Saving the user role
    });
    const saveUser = await newUser.save();

    // Passing the user role to the JWT so frontend can check permissions easily
    const payload = {
      id: saveUser._id,
      username: saveUser.username,
      type: saveUser.type,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      msg: "User Created Successfully",
      user: { username: saveUser.username, type: saveUser.type },
    });
  }),
);

router.post(
  "/signin",
  wrapAsync(async (req, res) => {
    const { username, password } = req.body;
    const userExist = await User.findOne({ username: username });

    if (!userExist) {
      return res.status(401).json({ msg: "Username or Password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);

    if (isMatch) {
      const payload = {
        id: userExist._id,
        username: userExist.username,
        type: userExist.type, // Include role in token
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.cookie("token", token, cookieOptions);

      res.status(200).json({
        msg: "User Login Successfully",
        user: { username: userExist.username, type: userExist.type },
      });
    } else {
      res.status(401).json({ msg: "Username or Password is incorrect" });
    }
  }),
);

router.post("/logout", (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ msg: "User Logged out successfully" });
});

router.get("/verify", authenticateToken, (req, res) => {
  // Now returning the user type alongside the username
  // Your friend will need this to hide/show Admin dashboards on refresh!
  res.status(200).json({
    msg: "Verified",
    user: {
      username: req.currUser.username,
      type: req.currUser.type,
    },
  });
});

module.exports = router;
