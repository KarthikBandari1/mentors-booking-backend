const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const jwt = require("jsonwebtoken");

const mentorRoutes = require("./routes/mentorRoutes");
const studentRoutes = require("./routes/studentRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
let db;
try {
  db = new sqlite3.Database("careercarve.db", (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to SQLite database.");
    }
  });
} catch (err) {
  console.error(err.message);
}

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "karthik_secret_key"
    );
    req.user = decoded.userId; // Attach user ID to the request object
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Routes
app.use("/api/mentors", authenticate, mentorRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/bookings", authenticate, bookingRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
