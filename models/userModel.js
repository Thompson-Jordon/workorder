require("dotenv").config();
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const db = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: db });

exports.getAllUsers = callback => {
  let query = {
    text:
      "SELECT id, username, first_name, last_name, is_admin, is_active, token FROM account"
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
      "SELECT username, first_name, last_name, is_admin, is_active, token FROM account WHERE id=$1",
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

exports.getUserByToken = (token, callback) => {
  let query = {
    text:
      "SELECT id, username, first_name, last_name, is_admin, is_active, token FROM account WHERE token=$1",
    values: [token]
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

exports.insertUser = (params, callback) => {
  let token = parseInt(Math.random() * 999999999);

  let query = {
    text:
      "INSERT INTO account (username, first_name, last_name, is_admin, is_active, password, token) VALUES ($1, $2, $3, $4, FALSE, 'DefaultPassword1@', $5)",
    values: [
      params.username,
      params.first_name,
      params.last_name,
      params.is_admin,
      token
    ]
  };

  pool.query(query, (err, res) => {
    if (err) {
      console.log("Error in query", err);
      callback(err, null);
    } else {
      callback(null, {success:true});
    }
  });
};

exports.registerUser = (params, callback) => {
  let query = {
    text: "UPDATE account SET password=$1, is_active='TRUE' WHERE id=$2",
    values: [params.hashPass, params.userId]
  }

  pool.query(query, (err, res) => {
    if (err) {
      console.log("Error in query", err);
      callback(err, {success:false});
    } else {
      callback(null, {success:true});
    }
  })
}