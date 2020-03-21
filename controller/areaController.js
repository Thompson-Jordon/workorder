const model = require("../models/areaModel");

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
