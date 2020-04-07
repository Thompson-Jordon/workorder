const express = require("express");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
let app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "some secret" }));

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
app.get("/", users.isAuth, (req, res) => {
  res.render("pages/index", {
    username: req.session.username,
    is_admin: req.session.is_admin,
    first_name: req.session.first_name,
    last_name: req.session.last_name,
  });
});
app.get("/login", users.isNotAuth, (req, res) => res.render("pages/login"));
app.get("/logout", users.isAuth);
app.get("/register", users.isNotAuth, (req, res) => res.render("pages/register"));

// Workorders
app.get("/Workorders", users.isAuth, workorders.getWorkorders);
app.get("/Workorder", users.isAuth, workorders.getWorkorder);
app.post("/Workorder", users.isAuth, workorders.createWorkorder);
app.post("/CompleteWorkorder", users.isAuth, workorders.completeWorkorder);

// Areas
app.get("/Areas", users.isAuth, areas.getAreas);
app.post("/Area", users.isAuth, areas.createArea);

// Locations
app.get("/Locations", users.isAuth, locations.getLocations);
app.get("/Location", users.isAuth, locations.getLocation);
app.post("/Location", users.isAuth, locations.createLocation);

// Devices
app.get("/Devices", users.isAuth, devices.getDevices);
app.get("/Device", users.isAuth, devices.getDevice);
app.post("/Device", users.isAuth, devices.createDevice);

// Types
app.get("/Types", users.isAuth, types.getTypes);

// Notes
app.get("/Notes", users.isAuth, notes.getNotes);
app.post("/Note", users.isAuth, notes.creatNote);

// Users
app.get("/Users", users.isAuth, users.getUsers);
app.get("/User", users.isAuth, users.getUserById);
app.get("/CurrentUser", users.isAuth, users.getCurrentUser);
app.post("/User", users.isAuth, users.createUser);
app.post("/login", users.isNotAuth, users.checkCred, users.login);
app.post("/logout", users.isAuth, users.logout);
app.post("/register", users.isNotAuth, users.register);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

function verifyLogin(req, res, next) {
  const user = req.session.username;
  if (req.body.loggingIn == "true") next();
  if (req.body.loggingOut == "true") next();
  if (
    user != "" &&
    typeof user !== "undefined" &&
    req.session.logged_in == true
  ) {
    next();
  } else {
    res.render("pages/login", {
      success: false,
      message: "Unauthorized",
    });
  }
}
