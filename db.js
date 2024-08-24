const sqlite3 = require("sqlite3").verbose();

let db;

try {
  db = new sqlite3.Database("careercarve.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to SQLite database.");
  });
} catch (err) {
  console.error(err.message);
}

module.exports = db;
