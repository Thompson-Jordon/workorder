/**
 * @file For ajax calls
 */

"use strict";
const ERROR = { message: "The request failed!" };

// create location
$(document).on("click", "#locationBtn", () => {
      let location = $("#location").val();
      let area = $("#area").val();

      $.post("/Location", { location: location, area: area }, res => {
        window.location.href = "#/Locations";
      }).fail(() => {
        display.html("<div>" + JSON.stringify(ERROR) + "</div>");
      });
    });

// create user
$(document).on("click", "#newUserBtn", () => {
  let username = $("#username").val();
  let first_name = $("#first_name").val();
  let last_name = $("#last_name").val();
  let is_admin = $("#is_admin").val();
  let params = {
    username: username,
    first_name: first_name,
    last_name: last_name,
    is_admin: is_admin
  }

  $.post("/User", params, res => {
    window.location.href = "#/Users";
  }).fail(() => {
    display.html("<div>" + JSON.stringify(ERROR) + "</div>");
  });
});

// create workorder
$(document).on("click", "#workorderBtn", () => {
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
  };

  $.post("/workorder", params, res => {
    window.location.href = "#/workorders";
  }).fail(() => {
    display.html("<div>" + JSON.stringify(ERROR) + "</div>");
  });
});

// create device
$(document).on("click", "#deviceBtn", () => {
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
  };

  $.post("/Device", params, res => {
    window.location.href = `#/Location_details/${location}`;
  }).fail(() => {
    display.html("<div>" + JSON.stringify(ERROR) + "</div>");
  });
});

// create note
$(document).on("click", "#addNoteBtn", () => {
  let myform = $("#addNote");
  let new_note = $("#new_note").val();
  let wo_id = $("#wo_id").val();
  let user_id = 1; // TODO: $("#user_id").val();
  let params = {
    new_note: new_note,
    wo_id: wo_id,
    user_id: user_id
  };

  $.post("/Note", params, res => {
    window.location.href = `#/Workorder_Details/${wo_id}`;
  }).fail(() => {
    display.html("<div>" + JSON.stringify(ERROR) + "</div>");
  });
});

// create note
$(document).on("click", "#completeBtn", () => {
  let myform = $("#completeWO");
  let id = $("#wo_id").val();

  $.post("/CompleteWorkorder", { id: id }, res => {
    //window.location.href = `#/Workorder_Details/${id}`;
    window.location.reload(true);
  }).fail(() => {
    display.html("<div>" + JSON.stringify(ERROR) + "</div>");
  });
});
