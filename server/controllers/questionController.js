// questionController.js
const Question = require("../models/questionModel");

const questionController = {
  // Getting topics
  async getTopics(req, res) {
    try {
      const topics = await Question.getTopics();
      res.json(topics);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Getting subtopics based on specific topic
  async getSubtopics(req, res) {
    try {
      const { topicId } = req.params;
      const subtopics = await Question.getSubtopics(topicId);
      res.json(subtopics);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Getting questions based on specific subtopic
  async getQuestions(req, res) {
    try {
      const { subtopicId } = req.params;
      const questions = await Question.getQuestions(subtopicId);
      res.json(questions);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = questionController;
