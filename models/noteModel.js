require("dotenv").config();
const { Pool } = require("pg");
const db = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: db });

exports.getNotesByWOId = (id, callback) => {
  let query = {
    text:
      "SELECT n.note AS note, to_char(n.date, 'mm/dd/yyyy HH12:MI AM') AS date, a.first_name AS first_name, a.last_name AS last_name FROM (wo_note n INNER JOIN account a ON n.user_id = a.id) WHERE n.wo_id=$1 ORDER BY n.date ASC",
    values: [id]
  };

  pool.query(query, (err, res) => {
    if (err) {
      console.log("Error in query", err);
      callback(err, null);
    } else {
      callback(null, res.rows);
    }
  });
};

exports.insertNote = (params, callback) => {
  let query = {
    text:
      "INSERT INTO wo_note (note, date, wo_id, user_id) VALUES ($1, NOW(), $2, $3)",
    values: [params.note, params.wo_id, params.user_id]
  };

  pool.query(query, (err, res) => {
    if (err) {
      console.log("Error in query", err);
      callback(err, null);
    } else {
      callback(null, { success: true });
    }
  });
};
