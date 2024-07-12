const pool = require("../config/pool");

const Question = {
  // Getting all topics
  async getTopics() {
    const query = `SELECT DISTINCT topic
                   FROM questions
                   ORDER BY topic;`;
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Getting all subtopics for a given topic
  // Using the closure table in the DB
  async getSubtopics(topicId) {
    const query = `WITH RankedSubtopics AS (
                   SELECT
                   q.subtopic,
                   q.label,
                   q.id,
                   ROW_NUMBER() OVER (PARTITION BY q.subtopic ORDER BY q.level ASC, q.id ASC) AS rn
                   FROM questions q
                   INNER JOIN questions_closure qc ON q.id = qc.descendant_id
                   INNER JOIN questions q_ancestor ON qc.ancestor_id = q_ancestor.id AND q_ancestor.topic = $1
                   )
                   SELECT subtopic, label
                   FROM RankedSubtopics
                   WHERE rn = 1
                   ORDER BY id ASC;`;
    try {
      const { rows } = await pool.query(query, [topicId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Getting all questions for a given subtopic
  // Using the closure table of the DB
  async getQuestions(subtopicId) {
    const query = `WITH FilteredQuestions AS (
                      SELECT
                          id,
                          topic,
                          subtopic,
                          label,
                          ROW_NUMBER() OVER (ORDER BY id ASC) AS rn
                      FROM questions
                      WHERE subtopic = $1
                    )
                    SELECT
                        id,    
                        subtopic,
                        label
                    FROM FilteredQuestions
                    WHERE rn > 1
                    ORDER BY id ASC;`;
    try {
      const { rows } = await pool.query(query, [subtopicId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Question;
