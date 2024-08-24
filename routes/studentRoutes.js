const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let db = new sqlite3.Database("careercarve.db");

router.post("/login", (req, res) => {
  const { studentId, password } = req.body;

  db.get(
    "SELECT id, password FROM students WHERE id = ?",
    [studentId],
    (err, user) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to login" });
      } else if (!user) {
        res.status(401).json({ error: "Invalid credentials ion" });
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.error(err.message);
            res.status(500).json({ error: "Failed to login" });
          } else if (result) {
            const token = jwt.sign(
              { userId: user.id },
              process.env.JWT_SECRET || "karthik_secret_key",
              { expiresIn: "1h" }
            );
            res.json({ token });
          } else {
            res.status(401).json({ error: "Invalid credentials" });
          }
        });
      }
    }
  );
});

router.post("/register", (req, res) => {
  const { name, email, availability, area_of_interest, password } = req.body;

  // Check if the user already exists
  db.get("SELECT id FROM students WHERE email = ?", [email], (err, user) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Failed to check user existence" });
    } else if (user) {
      res.status(409).json({ error: "User already exists" });
    } else {
      const sql =
        "INSERT INTO students (name, email, availability, area_of_interest, password) VALUES (?, ?, ?, ?, ?)";
      db.run(
        sql,
        [
          name,
          email,
          availability,
          area_of_interest,
          bcrypt.hashSync(password, 10),
        ],
        function (err) {
          if (err) {
            console.error(err.message);
            res.status(500).json({ error: "Failed to create student" });
          } else {
            // Send the student_id in the response
            res.json({
              message: "Student created successfully",
              student_id: this.lastID,
            });
          }
        }
      );
    }
  });
});

module.exports = router;
