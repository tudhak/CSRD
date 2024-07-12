const express = require("express");
const questionController = require("../controllers/questionController");
const router = express.Router();

// Route to get all topics
router.get("/", questionController.getTopics);
// Route to get all subtopics of a given topic
router.get("/:topicId/subtopics", questionController.getSubtopics);
// Route to get all questions of a given subtopic
router.get(
  "/:topicId/subtopics/:subtopicId/questions",
  questionController.getQuestions
);

module.exports = router;
