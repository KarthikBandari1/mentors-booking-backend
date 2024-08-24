const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

// Assuming you have a global `db` variable from your `app.js` file
let db = new sqlite3.Database("careercarve.db");

// GET all mentors

router.get("/", (req, res) => {
  db.all("SELECT * FROM mentors", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Failed to fetch mentors" });
    } else {
      res.json(rows);
    }
  });
});

// POST a new mentor
router.post("/", (req, res) => {
  const { name, availability, areas_of_expertise, is_premium } = req.body;

  // Validate input data here

  const sql =
    "INSERT INTO mentors (name, availability, areas_of_expertise, is_premium) VALUES (?, ?, ?, ?)";
  db.run(sql, [name, availability, areas_of_expertise, is_premium], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Failed to create mentor" });
    } else {
      res.json({ message: "Mentor created successfully" });
    }
  });
});

module.exports = router;
