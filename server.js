const express = require("express");
const path = require("path");
const session = require("express-session");
let app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "ssshhhhh" }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Controllers
let workorders = require("./controllers/workorderController");
let locations = require("./controllers/locationController");
let devices = require("./controllers/deviceController");
let types = require("./controllers/typeController");
let areas = require("./controllers/areaController");
let notes = require("./controllers/noteController");
let users = require("./controllers/userController");

// Main page
app.get("/", (req, res) => {
  //  sess = req.session;
  //  sess.username;
  res.render("pages/index");
});

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

// Types
app.get("/Types", types.getTypes);

// Notes
app.get("/Note", notes.getNotes);
app.post("/Note", notes.creatNote);

// Users
app.get("/Users", users.getUsers);
app.get("/User", users.getUser);
app.post("/User", users.createUser);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
