const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("careercarve.db");

// POST a new booking
router.post("/", (req, res) => {
  const {
    student_id,
    mentor_id,
    start_time,
    end_time,
    area_of_interest,
    cost,
    mentor_name,
  } = req.body;

  // Validate input data here (add validation logic)

  const sql =
    "INSERT INTO bookings (student_id, mentor_id, start_time, end_time, area_of_interest, cost,mentor_name) VALUES (?, ?, ?, ?, ?, ?,?)";
  db.run(
    sql,
    [
      student_id,
      mentor_id,
      start_time,
      end_time,
      area_of_interest,
      cost,
      mentor_name,
    ],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to create booking" });
      } else {
        res.json({ message: "Booking created successfully" });
      }
    }
  );
});

// GET all bookings for a student
router.get("/student/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  const sql = "SELECT * FROM bookings WHERE student_id = ?";
  db.all(sql, [studentId], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Failed to fetch bookings" });
    } else {
      res.json(rows);
    }
  });
});

router.get("/mentor/:mentorId", (req, res) => {
  const mentorId = req.params.mentorId;

  const sql = "SELECT * FROM bookings WHERE mentor_id = ?";
  db.all(sql, [mentorId], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Failed to fetch bookings" });
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
