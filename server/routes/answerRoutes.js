const express = require("express");
const sessionValidationMiddleware = require("../middlewares/authMiddleware");
const answerController = require("../controllers/answerController");
const router = express.Router();

// Route to create an answer
router.post("/", sessionValidationMiddleware, answerController.createAnswer);
// Route to get an answer for a given question and user
router.get(
  "/questions/:questionId/users/:userId",
  sessionValidationMiddleware,
  answerController.getAnswer
);
// Route to update an answer for a given question and user
router.patch(
  "/questions/:questionId/users/:userId",
  sessionValidationMiddleware,
  answerController.updateAnswer
);
// Route to get all answers for a user
router.get(
  "/users/:userId",
  sessionValidationMiddleware,
  answerController.getAnswers
);

module.exports = router;
