const model = require("../models/areaModel");

exports.createArea = (req, res) => {
  console.log("Trying to create area...");
  model.insertAreaByName("Test", (error, results) => {
    res.json(results);
  });
};
