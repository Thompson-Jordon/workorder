const model = require("../models/typeModel");

exports.getTypes = (req, res) => {
  console.log("Trying to get device types");
  model.getAllDeviceTypes((error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};
