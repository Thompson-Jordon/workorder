const model = require("../models/areaModel");

exports.getAreas = (req, res) => {
  console.log("Trying to get areas...");
  model.getAllAreas((error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};

exports.createArea = (req, res) => {
  console.log("Trying to create area...");
  let id = req.body.id;
  let name = req.body.name;
  model.insertAreaByName(id, name, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};
