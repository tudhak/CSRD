const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./config/pool");
const dotenv = require("dotenv");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

dotenv.config({ path: "./.env" });

// Initialize express
const app = express();
const port = process.env.PORT || 3000;

// Routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const questionRouter = require("./routes/questionRoutes");
const answerRouter = require("./routes/answerRoutes");

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    store: new pgSession({
      pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 7_200_000 },
  })
);

// Routes
// Authentication
app.use("/api/v1/auth", authRouter);
// User
app.use("/api/v1/users", userRouter);
// Questions
app.use("/api/v1/topics", questionRouter);
// Answers
app.use("/api/v1/answers", answerRouter);

// Connecting to the PostgreSQL database
pool.connect((err, client, release) => {
  if (err) {
    // Log the error and exit if the database connection fails
    console.error("Error acquiring client", err.stack);
    process.exit(1);
  }
  console.log("Connected to PostgreSQL database");
  // Release the client back to the pool when finished
  release();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
