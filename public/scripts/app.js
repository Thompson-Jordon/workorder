$(document).on("click", ".clickable-row", event => {
  window.location = event.target.parentNode.attributes.href.value;
});

// workorder dropdowns
$(document).on("change", "#location", () => {
  var id = $("#location").val();

  fetch(`/Devices?id=${id}`, { method: "GET" }).then(res => {
    res.text().then(result => {
      let rows = JSON.parse(result);
      let string = "";
      rows.forEach(device => {
        string += `<option value="${device.id}">${device.name}</option>`;
      });
      if (string == "") {
        string += "<option value=''>This location has no devices</option>";
      } else {
        string = "<option value=''>Select a device...</option>" + string;
      }
      $("#device_id").html(string);
    });
  });
});

// function for search filter
$(document).on("keyup", "#myInput", event => {
  var value = $(event.target)
    .val()
    .toLowerCase();
  $("#tableBody tr").filter(() => {
    $(this).toggle(
      $(this)
        .text()
        .toLowerCase()
        .indexOf(value) > -1
    );
  });
});

// function to sort table
function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
   no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
     first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
       one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
       based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
       and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
       set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// To take care of signup page
function submitCheck(pass1) {
  if (pass1.length > 6) {
    let regex = "/^(?=.*d).{7,}$/";
    //return true; /*note to self, remove this :)*/

    let position = pass1.search(regex);

    if (position >= 0) {
      //it's good
      clearError();
      return true;
    } else {
      //it's bad
      indicateError();
      return false;
    }
  }
}

function passwordsMatch(pass1, pass2) {
  if (pass1.length > 6) {
    if (!pass1.match(pass2)) {
      indicateError();
      return false;
    } else {
      clearError();
      return true;
    }
  }
}

function indicateError() {
  document.getElementsByClassName("error").innerHTML = "* Invalid Password";
  document.getElementById("password").style.borderColor = "red";
  document.getElementById("verifypassword").style.borderColor = "red";
}

function clearError() {
  document.getElementsByClassName("error").innerHTML = "";
  document.getElementById("password").style.borderColor = "#ced4da";
  document.getElementById("verifypassword").style.borderColor = "#ced4da";
}
