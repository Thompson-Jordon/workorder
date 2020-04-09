const model = require("../models/locationModel");

exports.getLocations = (req, res) => {
  console.log("Trying to get all locations...");
  model.getAllLocations((error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};

exports.getLocation = (req, res) => {
  console.log("Trying to get location...");
  let id = req.query.id;
  model.getLocationById(id, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};

exports.createLocation = (req, res) => {
  console.log("Trying to create location...");
  let name = req.body.location;
  let area = req.body.area;
  model.insertLocation(name, area, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.status(200).json(results);
    }
  });
};
