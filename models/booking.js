const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("careercarve.db");

// Create the bookings table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    mentor_id INTEGER NOT NULL,
    mentor_name TEXT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    area_of_interest TEXT NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (mentor_id) REFERENCES mentors(id)
  )`,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);
