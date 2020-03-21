const model = require("../models/workorderModel");

exports.getWorkorders = (req, res) => {
  console.log("Trying to get all workorders...");
  model.getAllWorkorders((error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};

exports.getWorkorder = (req, res) => {
  console.log("Trying to get workorder...");
  let id = req.query.id;
  model.getWorkorderById(id, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};

exports.createWorkorder = (req, res) => {
  console.log("Trying to create workorder...");
  model.insertWorkorder(req.body, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};
