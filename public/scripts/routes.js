"use strict"; // To keep code clean

// services
import Utils from "../services/utils.js";
 
// pages
import Error404 from          "../views/pages/Error404.js";
import Workorders from        "../views/pages/Workorders.js";
import Locations from         "../views/pages/Locations.js";
import Users from             "../views/pages/Users.js";
import Create_Workorder from  "../views/pages/Create_Workorder.js";
import Create_Location from   "../views/pages/Create_Location.js";
import Create_User from       "../views/pages/Create_User.js";
import Create_Device from     "../views/pages/Create_Device.js";
import Workorder_Details from "../views/pages/Workorder_Details.js";
import Location_Details from  "../views/pages/Location_Details.js";
import Change_Password from   "../views/pages/Change_Password.js";

// Supported Routes
const routes = { 
  "/"                       : Workorders,
  "/workorders"             : Workorders,
  "/locations"              : Locations,
  "/users"                  : Users,
  "/workorder_details/:id"  : Workorder_Details,
  "/location_details/:id"   : Location_Details,
  "/create_workorder"       : Create_Workorder,
  "/create_location"        : Create_Location,
  "/create_user"            : Create_User,
  "/create_device/:id"      : Create_Device,
  "/change_password"        : Change_Password,
};

// handling content router
const router = async () => {
  // load view element
  const content = null || document.getElementById("content");

  // Get the addressbar URL
  let request = Utils.parseRequestURL();

  // Parse the URL
  let parseURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/:id" : "") + (request.verb ? "/" + request.verb : "");

  // Get the page from the hash of supported routes
  // if the parsed URL is not in the supported list then post 404 page
  let page = routes[parseURL] ? routes[parseURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

// Listen for hash change or page load
$(window).on("hashchange", router);
$(window).on("load", router);
