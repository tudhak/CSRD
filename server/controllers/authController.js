const pool = require("../config/pool");
const bcrypt = require("bcrypt");

// Simple authentication controller to handle signup, user login and logout

// User signup
exports.register = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  // Basic validation
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    // Check if the email already exists in the database
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      // If a user with this email already exists, send an error response
      return res
        .status(400)
        .json({ message: "An account with this email already exists." });
    }
    // Insert user into the database
    const hashedPassword = await bcrypt.hash(password, 12);
    const query =
      "INSERT INTO users (email, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [email, hashedPassword, firstname, lastname];

    const result = await pool.query(query, values);

    // Respond with the created user (excluding the password for security)
    const user = result.rows[0];
    const userId = user.id;
    req.session.userId = userId;
    delete user.password;
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    // Handle errors
    console.error("Error in registration endpoint", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// User login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  try {
    // Check if the user exists
    const userData = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userData.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare submitted password with hashed password in the database
    const user = userData.rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If user exists & password is correct
    req.session.userId = user.id;
    res.status(200).json({
      status: "success",
    });
    console.log("User logged in successfully");
  } catch (error) {
    console.error("Error in login endpoint", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// User logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not log out, please try again.");
    } else {
      res.clearCookie("connect.sid");
      console.log("User Logged out successfully");
      return res.status(200).json({ message: "Logged out successfully" });
    }
  });
};
