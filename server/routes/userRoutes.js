const express = require("express");
const userController = require("../controllers/userController");
const sessionValidationMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Route to get user information
router.get("/me", sessionValidationMiddleware, userController.getUserInfo);

module.exports = router;
