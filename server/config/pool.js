const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/../.env` });

// PostgreSQL connection setup
const pool = new Pool({
  user: `${process.env.DB_USERNAME}`,
  host: "localhost",
  database: `${process.env.DB_NAME}`,
  password: `${process.env.DB_PASSWORD}`,
  port: 5432,
});

module.exports = pool;
