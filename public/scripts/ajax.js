/**
 * @file For ajax calls
 */

"use strict";
const ERROR = { message: "The request failed!" };

// do this to get the page to load before listeners
$("#wo_nav").click(function() {
  // perform ajax
  $.get("/Workorders", function(res) {
    display.html(res);
  }).fail(() => {
    display.html("<div>" + JSON.stringify(ERROR) + "</div>");
  });
});
