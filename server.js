const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
let app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Controllers
let workorders = require("./controller/workorderController");
let locations = require("./controller/locationController");
let devices = require("./controller/deviceController");
let areas = require("./controller/areaController");
let notes = require("./controller/noteController");
let users = require("./controller/userController");

// Main page
app.get("/", (req, res) => res.render("pages/index"));

// Workorders
app.get("/Workorders", workorders.getWorkorders);
app.get("/Workorder", workorders.getWorkorder);
app.post("/Workorder", workorders.createWorkorder);

// Areas
app.get("/Areas", areas.getAreas);
app.post("/Area", areas.createArea);

// Locations
app.get("/Locations", locations.getLocations);
app.get("/Location", locations.getLocation);
app.post("/Location", locations.createLocation);

// Devices
app.get("/Devices", devices.getDevices);
app.get("/Device", devices.getDevice);
app.post("/Device", devices.createDevice);

// Notes
app.get("/Note", notes.getNotes);
app.post("/Note", notes.creatNote);

// Users
app.get("/Users", users.getUsers);
app.get("/User", users.getUser);
app.post("/User", users.createUser);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
