const pool = require(`${__dirname}/../config/pool.js`);
const fs = require("fs");

// Script to populate the questions and questions_closure tables of the PostreSQL DB

const importData = async (filePath) => {
  try {
    // Read the JSON file
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Import questions and build closure table entries
    for (const item of data) {
      await importQuestion(item, null);
    }

    console.log("Data import completed successfully.");
  } catch (err) {
    console.error("Error importing data:", err);
  }
};

const importQuestion = async (item, parentId) => {
  // Insert question into questions table
  const res = await pool.query(
    "INSERT INTO questions (topic, subtopic, label, level) VALUES ($1, $2, $3, $4) RETURNING id",
    [item.topic, item.subtopic, item.label, item.level]
  );
  const questionId = res.rows[0].id;

  // If there's a parent, insert into closure table
  if (parentId !== null) {
    await pool.query(
      "INSERT INTO questions_closure (ancestor_id, descendant_id, depth) VALUES ($1, $2, 0)",
      [questionId, questionId]
    );
    const ancestors = await pool.query(
      "SELECT ancestor_id FROM questions_closure WHERE descendant_id = $1",
      [parentId]
    );
    for (const ancestor of ancestors.rows) {
      await pool.query(
        "INSERT INTO questions_closure (ancestor_id, descendant_id, depth) VALUES ($1, $2, $3)",
        [ancestor.ancestor_id, questionId, 1]
      );
    }
  } else {
    await pool.query(
      "INSERT INTO questions_closure (ancestor_id, descendant_id, depth) VALUES ($1, $2, 0)",
      [questionId, questionId]
    );
  }

  // Recursively import children
  for (const child of item.children || []) {
    await importQuestion(child, questionId);
  }
};

importData(`${__dirname}/../data/treeStructure.json`);
