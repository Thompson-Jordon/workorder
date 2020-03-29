/**
 * @file For ajax calls
 */

"use strict";
const ERROR = { message: "The request failed!" };

// create location
$(document).ready(() => {
  $("body").on("click", "#locationBtn", () => {
    let myform = $("#locationForm");
    myform.on("submit", e => {
      e.preventDefault();
      let location = $("#location").val();
      let area = $("#area").val();

      $.post("/Location", {location:location, area:area}, res => {
        window.location.href = "#/Locations";
      }).fail(() => {
        display.html("<div>" + JSON.stringify(ERROR) + "</div>");
      });
    });
  });
});

// create workorder
$(document).ready(() => {
  $("body").on("click", "#workorderBtn", () => {
    let myform = $("#workorderForm");
    myform.on("submit", e => {
      e.preventDefault();
      let location = $("#location").val();
      let device_id = $("#device_id").val();
      let user = $("#user").val();
      let description = $("#description").val();
      let priority = $("#priority").val();
      let params = {
        location: location,
        device_id: device_id,
        user: user,
        description: description,
        priority: priority
      }

      $.post("/workorder", params, res => {
        window.location.href = "#/workorders";
      }).fail(() => {
        display.html("<div>" + JSON.stringify(ERROR) + "</div>");
      });
    });
  });
});

// create device
$(document).ready(() => {
  $("body").on("click", "#deviceBtn", () => {
    let myform = $("#deviceForm");
    myform.on("submit", e => {
      e.preventDefault();
      let type = $("#type").val();
      let device = $("#device").val();
      let device_id = $("#device_id").val();
      let is_sched = $("#is_sched").val();
      let frequency = $("#frequency").val();
      let location = $("#location").val();
      let params = {
        type: type,
        device: device,
        device_id: device_id,
        is_sched: is_sched,
        frequency: frequency,
        location: location
      }

      $.post("/Device", params, res => {
        window.location.href = `#/Location_details/${location}`;
      }).fail(() => {
        display.html("<div>" + JSON.stringify(ERROR) + "</div>");
      });
    });
  });
});