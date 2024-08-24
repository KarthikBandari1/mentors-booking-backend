const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("careercarve.db");

// Create the mentors table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS mentors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  availability TEXT,
  areas_of_expertise TEXT,
  is_premium BOOLEAN
)`,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);
