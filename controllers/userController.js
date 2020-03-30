const model = require("../models/userModel");

exports.getUsers = (req, res) => {
  console.log("Trying to get all users...");
  model.getAllUsers((error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};

exports.getUserById = (req, res) => {
  let id = req.body.user_id;
  console.log("Trying to get User:", id);
  model.getUserById(id, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};

exports.getUserByUsername = (req, res, callback) => {
  let username = req.body.username;
  console.log("Trying to get " + username);
  model.getUserByUsername(username, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      callback(results);
    }
  });
};

exports.createUser = (req, res) => {
  console.log("Trying to create User...");
  let username = req.body.username;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let password = req.body.password;
};
