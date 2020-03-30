"use strict"; // To keep code clean

// import pages
import workorders from        "../views/pages/workorders.js";
import locations from         "../views/pages/locations.js";
import create_location from   "../views/pages/create_location.js";
import create_workorder from  "../views/pages/create_workorder.js";
import error404 from          "../views/pages/error404.js";
import location_details from  "../views/pages/location_details.js";
import create_device from     "../views/pages/create_device.js";

// services
import Utils from "../services/utils.js";

// Supported Routes
const routes = {
  "/workorders": workorders,
  "/locations": locations,
  "/create_location": create_location,
  "/create_workorder": create_workorder,
  "/location_details/:id": location_details,
  "/create_device/:id": create_device
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
  let page = routes[parseURL] ? routes[parseURL] : error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

// Listen for hash change or page load
$(window).on("hashchange", router);
$(window).on("load", router);
