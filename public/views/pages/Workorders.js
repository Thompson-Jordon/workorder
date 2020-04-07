let getWorkorders = async () => {
  try {
    let response = await fetch("/Workorders", {method:"GET"});
    const json = await response.json();
    return json;
 } catch (err){
    console.log("Error getting json", err);
 }
};

let Workorders = {
  render: async () => {
    let wo = await getWorkorders();
    let view = /*html*/ `<div class="jumbotron jumbotron-fluid bg-secondary pt-3">
    <div class="container-fluid form-group border-info rounded bg-light py-3">
      <div class="form-inline">
        <a
          class="btn btn-info mb-3 form-control"
          href="#/Create_Workorder"
          role="button"
          >Create Workorder</a
        >` +
        // <input
        //   class="form-control mb-2 ml-auto"
        //   id="myInput"
        //   type="text"
        //   placeholder="Search.."
        // />
      `</div>
      <div class="bg-light">
        <table id="myTable" class="table table-striped table-hover table-sm">
          <thead>
            <tr>
              <th onclick="sortTable(0)">ID</th>
              <th onclick="sortTable(1)">Location</th>
              <th onclick="sortTable(2)">Device</th>
              <th onclick="sortTable(3)">Created</th>
              <th onclick="sortTable(4)">Completed</th>
              <th onclick="sortTable(5)">Priority</th>
              <th onclick="sortTable(6)">Assigned To</th>
              <th onclick="sortTable(7)">Description</th>
            </tr>
          </thead>
          <tbody id="tableBody">`;
    wo.forEach(row => {
      view += `<tr class="clickable-row" href="#/workorder_details/${row.id}">
           <td>${row.id}</td>
           <td>${row.location}</td>
           <td>${row.device}</td>
           <td>${row.start_date}</td>
           <td>`;
           if (row.start == "null") {
             view += row.end_date;
           } else {
             view += "";
           }
           view += `</td>
           <td>${row.priority}</td>
           <td>${row.first_name} ${row.last_name}</td>
           <td>${row.description}</td>
           </tr>`;
    });
    view += `</tbody></table></div></div></div>`;

    return view;
  },
  after_render: async () => {}
};

export default Workorders;
