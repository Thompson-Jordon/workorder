require('dotenv').config();
const { Pool } = require("pg");
const db = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: db });

exports.getAllLocations = callback => {
  let query = {
    text:
      "SELECT l.id AS id, l.name AS location, a.name AS area FROM location l INNER JOIN area a ON l.area_id = a.id ORDER BY l.name ASC"
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

exports.getLocationById = (id, callback) => {
  let query = {
    text:
      "SELECT l.name AS location, a.name AS area FROM location l INNER JOIN area a ON l.area_id = a.id WHERE l.id=$1",
    values: [id]
  };

  pool.query(query, (err, res) => {
    if (err) {
      console.log("Error in query", err);
      callback(err, null);
    } else {
      callback(null, res.rows[0]);
    }
  });
};

exports.insertLocation = (name, area, callback) => {
  let query = {
    text: "INSERT INTO location (name, area_id) VALUES ($1, $2)",
    values: [name, area]
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
