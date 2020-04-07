// create location
$(document).on("click", "#loginBtn", () => {
  let username = $("#username").val();
  let password = $("#password").val();
  let loggingIn = $("#loggingIn").val();
  let params = {
    username: username,
    password: password,
    loggingIn: loggingIn,
  };

  $.post("/login", params, (res) => {
    $.get("/");
  }).fail(() => {
    display.html("<div>" + JSON.stringify(ERROR) + "</div>");
  });
});
