"use strict"; // To keep code clean

// import pages
import Workorders from        "../views/pages/Workorders.js";
import Locations from         "../views/pages/Locations.js";
import Create_Location from   "../views/pages/Create_Location.js";
import Create_Workorder from  "../views/pages/Create_Workorder.js";
import Error404 from          "../views/pages/Error404.js";
import Location_Details from  "../views/pages/Location_Details.js";
import Create_Device from     "../views/pages/Create_Device.js";

// services
import Utils from "../services/utils.js";

// Supported Routes
const routes = {
  "/workorders": Workorders,
  "/locations": Locations,
  "/create_location": Create_Location,
  "/create_workorder": Create_Workorder,
  "/location_details/:id": Location_Details,
  "/create_device/:id": Create_Device
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
