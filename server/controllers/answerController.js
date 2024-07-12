const Answer = require("../models/answerModel");

// Creating a new answer for a specific question and user
exports.createAnswer = async (req, res) => {
  try {
    const { questionId, userId, answerText } = req.body;
    const answer = await Answer.createAnswer(questionId, userId, answerText);
    res.status(201).json(answer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Getting an answer for a specific question and user
exports.getAnswer = async (req, res) => {
  try {
    const { questionId, userId } = req.params;
    const answer = await Answer.getAnswer(questionId, userId);
    if (!answer || answer.length === 0)
      return res.status(200).json({
        message: `No stored answer for question ${questionId} and user ${userId}`,
        data: {},
      });
    res.status(200).json(answer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Updating an answer for a specific question and user
exports.updateAnswer = async (req, res) => {
  try {
    const { questionId, userId, answerText } = req.body;
    const answer = await Answer.updateAnswer(answerText, questionId, userId);
    res.status(200).json(answer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Getting all answers for a given user
exports.getAnswers = async (req, res) => {
  try {
    const { userId } = req.params;
    const answers = await Answer.getAnswers(userId);
    res.status(200).json(answers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
