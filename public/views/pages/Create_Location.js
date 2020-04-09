let getAreas = async () => {
  try {
    let response = await fetch("/Areas", { method: "GET" });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log("Error getting json", err);
  }
};

let Create_Location = {
  render: async () => {
    let areas = await getAreas();
    let view = /*html*/ `<div class="jumbotron jumbotron-fluid">
     <div class="container">
        <h1 class="display-3">Enter New location</h1>
     </div>
  </div>

  <form id="locationForm">
     <div class="container">
        <div class="form-group">
           <label for="location">Location:</label>
           <input type="text" id="newLocation" name="location" class="form-control" required>
        </div>
        <div class="form-group">
           <label for="area">Area:</label>
           <select type="text" id="area" name="area" class="form-control" required>
              <option value="">Select an Area</option>`;
    areas.forEach(row => {
      view += `<option value="${row.id}">${row.name}</option>`;
    });
    view += `</select></div><input type="button" id="locationBtn" class="btn btn-info" value="Submit"></div></form>`;

    return view;
  },
  after_render: async () => {}
};

export default Create_Location;
