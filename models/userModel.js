require("dotenv").config();
const { Pool } = require("pg");
const db = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: db });

exports.getAllUsers = callback => {
  let query = {
    text:
      "SELECT id, username, first_name, last_name, is_admin, is_active FROM account"
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

exports.getUserById = (id, callback) => {
  let query = {
    text:
      "SELECT username, first_name, last_name, is_dmin, is_active FROM account WHERE id=$1",
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

exports.getUserByUsername = (username, callback) => {
  let query = {
    text:
      "SELECT id as user_id, username, first_name, last_name, is_admin, is_active, password FROM account WHERE username=$1",
    values: [username]
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

exports.insertUser = (username, fname, lname, password, callback) => {
  // TODO:
};
