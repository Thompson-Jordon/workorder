const model = require("../models/deviceModel");

exports.getDevices = (req, res) => {
  console.log("Trying to get all devices...");
  let id = req.query.id;
  model.getDevicesByLocationId(id, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};

exports.getDevice = (req, res) => {
  console.log("Trying to get device...");
  let id = req.query.id;
  model.getDevicesByDeviceId(id, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};

exports.createDevice = (req, res) => {
  console.log("Trying to create device...");
  let params = req.body;

  model.insertDevice(params, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};
