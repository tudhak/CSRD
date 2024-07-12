const pool = require("../config/pool");

const Answer = {
  // Creating an answer for a specific question and user
  async createAnswer(questionId, userId, answerText) {
    const query = `INSERT INTO answers (question_id, user_id, answer)
    VALUES ($1, $2, $3)
    RETURNING *;`;

    try {
      const { rows } = await pool.query(query, [
        questionId,
        userId,
        answerText,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Getting an answer for a specific question and user
  async getAnswer(questionId, userId) {
    const query = `SELECT answer FROM answers
                   WHERE question_id = $1
                   AND user_id = $2`;

    try {
      const { rows } = await pool.query(query, [questionId, userId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Updating an answer for a specific question and user
  async updateAnswer(answerText, questionId, userId) {
    const query = `UPDATE answers SET answer = $1
                   WHERE question_id = $2 AND user_id = $3
                   RETURNING *;`;
    try {
      const { rows } = await pool.query(query, [
        answerText,
        questionId,
        userId,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Getting all answers for a given user
  async getAnswers(userId) {
    const query = `SELECT
      q.id,
      q.topic,
      q.subtopic,
	    q.label,
      q.level,
      a.answer,
      a.id AS answer_id
    FROM
      questions q
    INNER JOIN answers a ON q.id = a.question_id
    WHERE
      a.user_id = $1
    ORDER BY
      a.id DESC;`;

    try {
      const { rows } = await pool.query(query, [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Answer;
