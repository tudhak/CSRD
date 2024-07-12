const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

// Sign up route
router.post("/register", authController.register);
// Login route
router.post("/login", authController.login);
// Logout route
router.post("/logout", authController.logout);

module.exports = router;
