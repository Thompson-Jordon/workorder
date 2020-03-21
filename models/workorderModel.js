require('dotenv').config();
const { Pool } = require("pg");
const db = process.env.DATABASE_URL || process.env.LOCALDB_URL;
const pool = new Pool({ connectionString: db });

exports.getAllWorkorders = callback => {
  let sql =
    "SELECT w.id As id, l.name AS location, d.name AS device, to_char(w.start_date, 'mm/dd/yyyy') AS start_date, to_char(w.end_date, 'mm/dd/yyyy') AS end_date, w.priority AS priority, a.first_name as first_name, a.last_name as last_name, w.description AS description FROM ( ( ( workorder w INNER JOIN device d ON w.device_id = d.id ) INNER JOIN location l ON d.location_id = l.id) INNER JOIN account a ON w.user_id = a.id )";

  pool.query(sql, function(err, res) {
    if (err) {
      console.log("Error in query", err);
      callback(err, null);
    } else {
      // console.log("Found result:", JSON.stringify(result.rows));
      callback(null, res.rows);
    }
  });
};

exports.getWorkorderById = (id, callback) => {
  let query = {
    text:
      "SELECT w.id As id, l.name AS location, d.name AS device, to_char(w.create_date, 'mm/dd/yyyy HH12:MI AM') AS create_date, to_char(w.start_date, 'mm/dd/yyyy HH12:MI AM') AS start_date, to_char(w.end_date, 'mm/dd/yyyy HH12:MI AM') AS end_date, to_char(w.deadline, 'mm/dd/yyyy HH12:MI AM') AS deadline, w.reoccurring AS reoccurring, w.priority AS priority, a.first_name as first_name, a.last_name as last_name, w.description AS description FROM ( ( ( workorder w INNER JOIN device d ON w.device_id = d.id ) INNER JOIN location l ON d.location_id = l.id) INNER JOIN account a ON w.user_id = a.id ) WHERE w.id=$1",
    values: [id]
  };

  pool.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      callback(err, null);
    } else {
      callback(null, res.rows[0]);
    }
  });
};

exports.insertWorkorder = (body, callback) => {
  let query = {
    text:
      "INSERT INTO workorder (create_date, start_date, device_id, user_id, description, priority, reoccurring) VALUES (NOW(), NOW(), $1, $2, $3, $4, false)",
    values: [body.device_id, body.user_id, body.description, body.priority]
  };

  pool.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      callback(err, null);
    } else {
      callback(null, { success: true });
    }
  });
};
