const sqlite3 = require("sqlite3").verbose();

// Assuming you have a global `db` variable from your `app.js` file
let db = new sqlite3.Database("careercarve.db");

// Create the students table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  password TEXT,
  name TEXT NOT NULL,
  availability TEXT,
  area_of_interest TEXT,
  email TEXT
)`,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);
