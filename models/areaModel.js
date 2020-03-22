require("dotenv").config();
const { Pool } = require("pg");
const db = process.env.DATABASE_URL || process.env.LOCALDB_URL;
const pool = new Pool({ connectionString: db });

exports.getAllAreas = callback => {
  let query = {
    text: "SELECT id, name FROM area"
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

exports.insertAreaByName = (id, name, callback) => {
  let query = {
    text: "INSERT INTO area (id, name) VALUES ($1, $2)",
    values: [id, name]
  };

  pool.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      callback(err, null);
    } else {
      console.log(res.rows);
      callback(null, { success: true });
    }
  });
};
