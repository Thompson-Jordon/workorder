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

// create note
$(document).ready(() => {
  $("body").on("click", "#addNote", () => {
    let myform = $("#addNote");
    myform.on("submit", e => {
      e.preventDefault();
      e.stopPropagation();
      let new_note = $("#new_note").val();
      let wo_id = $("#wo_id").val();
      let user_id = 1; // TODO: $("#user_id").val();
      let params ={
        new_note: new_note,
        wo_id: wo_id,
        user_id: user_id
      }

      $.post("/Note", params, res => {
        window.location.href = `#/Workorder_Details/${wo_id}`;
      }).fail(() => {
        display.html("<div>" + JSON.stringify(ERROR) + "</div>");
      });
    });
  });
});

// create note
$(document).ready(() => {
  $("body").on("click", "#completeWO", () => {
    let myform = $("#completeWO");
    myform.on("submit", e => {
      e.preventDefault();
      $('#completeWO').unbind("submit").submit();
      let id = $("#wo_id").val();

      $.post("/CompleteWorkorder", {id:id}, res => {
        window.location.href = `#/Workorder_Details/${id}`;
      }).fail(() => {
        display.html("<div>" + JSON.stringify(ERROR) + "</div>");
      });
    });
  });
});