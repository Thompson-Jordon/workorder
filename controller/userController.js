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

exports.getUser = (req, res) => {
  console.log("Trying to get User...");
  let id = req.body.user_id;
  model.getUserById(id, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
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
