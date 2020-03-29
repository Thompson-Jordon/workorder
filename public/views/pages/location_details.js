import Utils from "../../services/utils.js";

let getLocation = async id => {
  try {
    let response = await fetch(`/Location?id=${id}`, { method: "GET" });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log("Error getting json", err);
  }
};

let getDevices = async id => {
  try {
    let response = await fetch(`/Devices?id=${id}`, { method: "GET" });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log("Error getting json", err);
  }
};

let Location_Details = {
  render: async () => {
    let id = Utils.parseRequestURL().id;
    let location = await getLocation(id);
    let rows = await getDevices(id);
    let view = /*html*/ `<div class="jumbotron jumbotron-fluid bg-secondary">
     <div class="container border-secondary rounded bg-light">
        <h1 class="display-3">${location.location}<echo>
        </h1>
        <h4>${location.area}</h4>
        <hr class="my-2">
        <p class="lead">
           <a class="btn btn-info btn-lg" href="#/create_device/${id}" role="button">Add Device</a>
        </p>
        <div class="container pb-2">
           <h5>Devices:</h5>
           <table id="myTable" class="table table-striped table-sm">
              <tr>
                 <th onclick="sortTable(0)">Name</th>
                 <th onclick="sortTable(1)">Device ID</th>
                 <th onclick="sortTable(2)">Device Type</th>
              </tr>`;
    rows.forEach(row => {
      view += `<tr>
                 <td>${row.name}</td>
                 <td>${row.id}</td>
                 <td>${row.type}</td>
               </tr>`;
    });
    view += `</table></div></div></div>`;

    return view;
  },
  after_render: async () => {}
};

export default Location_Details;
