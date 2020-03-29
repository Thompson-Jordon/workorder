import Utils from "../../services/utils.js";

let getDeviceTypes = async () => {
  try {
    let response = await fetch(`/Types`, { method: "GET" });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log("Error getting json", err);
  }
};

let Create_Device = {
  render: async () => {
    let location_id = Utils.parseRequestURL().id;
    let rows = await getDeviceTypes();
    let view = /*html*/ `<div class="jumbotron jumbotron-fluid">
                           <div class="container">
                             <h1 class="display-3">Enter New Device</h1>
                           </div>
                         </div>

                         <form id="deviceForm" action="" method="post">
                           <div class="container">
                             <div class="form-group">
                               <label for="type">Device Type:</label>
                                 <select type="text" id="type" name="type" class="form-control" required>
                                   <option value="">Select a device type</option>`;
    rows.forEach(row => {
      view += `<option value="${row.id}">${row.name}</option>`;
    });
    view += `</select>
          </div>
          <div class="form-group">
             <label for="name">Device Name:</label>
             <input type="text" id="device" name="device" class="form-control" required>
          </div>
          <div class="form-group">
             <label for="device_id">Device ID: (Optional)</label>
             <input type="text" id="device_id" name="device_id" class="form-control">
          </div>
          <div class="form-group">
             <label for="is_sched">Sheduled?</label>
             <select type="text" id="is_sched" name="is_sched" class="form-control">
                <option value="False">No</option>
                <option value="True">Yes</option>
             </select>
          </div>
          <div class="form-group">
             <label for="frequency">Frequency: (in days)</label>
             <input type="text" id="frequency" name="frequency" class="form-control" value="0">
          </div>
          <input type="hidden" id="location" name="location" value="${location_id}">
          <button type="submit" id="deviceBtn" class="btn btn-info">Submit</button>
       </div>
      </form>`;

    return view;
  },
  after_render: async () => {}
};

export default Create_Device;
