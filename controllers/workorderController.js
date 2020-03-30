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

  let description = req.body.description;
  let device_id = req.body.device_id;
  let priority = req.body.priority;
  let user_id = req.body.user;

  let params = {
    description: description,
    device_id: device_id,
    priority: priority,
    user_id: user_id
  };

  model.insertWorkorder(params, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};

exports.completeWorkorder = (req, res) => {
  console.log("Trying to complete workorder...");
  let id = req.body.id;

  model.completeWorkorderById(id, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.status(200).json(results);
    }
  });
};
