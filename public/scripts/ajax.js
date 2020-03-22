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
      let workorder = $("#workorder").val();
      let area = $("#area").val();

      $.post("/workorder", {workorder:workorder, area:area}, res => {
        window.workorder.href = "#/workorders";
      }).fail(() => {
        display.html("<div>" + JSON.stringify(ERROR) + "</div>");
      });
    });
  });
});