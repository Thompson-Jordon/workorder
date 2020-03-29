let getLocations = async () => {
  try {
    let response = await fetch("/Locations", { method: "GET" });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log("Error getting json", err);
  }
};

let getUsers = async () => {
  try {
    let response = await fetch("/Users", { method: "GET" });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log("Error getting json", err);
  }
};

let Create_Workorder = {
  render: async () => {
    let locations = await getLocations();
    let users = await getUsers();
    let view = /*html*/ `<div class="jumbotron jumbotron-fluid">
     <div class="container">
        <h1 class="display-3">Enter New Work Order</h1>
     </div>
  </div>

  <form id="workorderForm" method="post">
     <div class="container">
        <div class="form-group">
           <label for="location">Location:</label>
           <select type="text" id="location" name="location" class="form-control" required>
              <option value="" disabled selected>Select a location</option>`;
    locations.forEach(row => {
      view += `<option value="${row.id}">${row.location}</option>`;
    });
    view += `</select>
     </div>
     <div class="form-group">
        <label for="device">Device:</label>
        <select type="text" id="device_id" name="device" class="form-control" required>
           <option value="" disabled selected>Select a location first</option>
        </select>
     </div>
     <div class="form-group">
        <label for="user">Assign to:</label>
        <select type="text" id="user" name="user" class="form-control" required>
           <option value="">Select a User</option>`;
    users.forEach(row => {
      view += `<option value="${row.id}">${row.first_name} ${row.last_name}</option>`;
    });
    view += `</select>
    </div>
    <div class="form-group">
       <label for="description">Description:</label>
       <input type="text" id="description" name="description" class="form-control">
    </div>
    <div class="form-group">
       <label for="priority">Priority:</label>
       <select type="text" id="priority" name="priority" class="form-control">
          <option value="1">1 - High</option>
          <option value="2">2 - Medium</option>
          <option value="3">3 - Low</option>
       </select>
    </div>
    <button id="workorderBtn" class="btn btn-info">Submit</button>
 </div>
</form>`;

    return view;
  },
  after_render: async () => {}
};

export default Create_Workorder;
