const pool = require("../config/pool");

// Getting user data based on userId
exports.getUserById = async (userId) => {
  try {
    const userInfo = await pool.query(
      "SELECT id, email, firstname, lastname FROM users WHERE id = $1",
      [userId]
    );
    return userInfo.rows.length > 0 ? userInfo.rows[0] : null;
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
