let getLocations = async () => {
  try {
    let response = await fetch("/Locations", { method: "GET" });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log("Error getting json", err);
  }
};

let Locations = {
  render: async () => {
    let rows = await getLocations();
    let view = /*html*/ `<div class="jumbotron jumbotron-fluid bg-secondary">
    <div class="container form-inline border-secondary rounded bg-light py-3">
          <a class="btn btn-info form-control mb-3" href="#/create_location" role="button">Add Location</a>
          <input class="form-control mb-2 ml-auto" id="myInput" type="text" placeholder="Search..">
       <div class="container">
          <table id="myTable" class="table table-striped table-hover table-sm">
             <thead>
                <tr>
                   <th onclick="sortTable(0)">Location</th>
                   <th onclick="sortTable(1)">Area</th>
                </tr>
             </thead>
             <tbody id="tableBody">`;
    rows.forEach(row => {
      view += `<tr class="clickable-row" href="#/location_details/${row.id}">
       <td>${row.location}</td>
       <td>${row.area}</td>
    </tr>`;
    });
    view += `</tbody></table></div></div></div>`;

    return view;
  },
  after_render: async () => {}
};

export default Locations;
