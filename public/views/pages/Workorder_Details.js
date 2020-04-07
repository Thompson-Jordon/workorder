import Utils from "../../services/utils.js";

let getWorkorder = async id => {
  try {
    let response = await fetch(`/Workorder?id=${id}`, { method: "GET" });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log("Error getting json", err);
  }
};

let getNotes = async id => {
  try {
    let response = await fetch(`/Notes?id=${id}`, { method: "GET" });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log("Error getting json", err);
  }
};

let Workorder_Details = {
  render: async () => {
    let id = Utils.parseRequestURL().id;
    let wo = await getWorkorder(id); // Get workorder
    let notes = await getNotes(id);
    let view = /*html*/ `<div class="jumbotron jumbotron-fluid bg-secondary pt-3">
      <div class="container border-secondary rounded bg-light pb-2">
         <h1 class="display-3">Work Order #${id}<echo>
         </h1>
         <h3>${wo.location} ${wo.device}</h3>
         <h5>Assigned to: ${wo.first_name} ${wo.last_name}</h5>
         <small class="text-info">Date Created: ${wo.start_date}</small>`;
    if (wo.end_date != null) {
      view += `</br><small class="text-info">Date Completed: ${wo.end_date}</small>`;
    }
    view += `<hr class="my-2">
         <h4>Description:</h4>
         <p>${wo.description}</p>
         <hr class="my-2">
         <h4>User Notes: </h4>`;
    notes.forEach(row => {
      view += `<small class="text-info">${row.first_name} ${row.last_name} - ${row.date}</small>
            <p>${row.note}</p>`;
    });
    if (wo.end_date == null) {
      view += `<form id="addNote" method="post">
               <textarea type="text" id="new_note" name="new_note" cols="40" rows="5"></textarea></br>
               <input type="hidden" id="wo_id" name="wo_id" value="${id}">
               <input type="button" id="addNoteBtn" class="btn btn-info" value="Add Note">
            </form>
            <form id="completeWO" method="post">
               <input type="button" id="completeBtn" class="btn btn-danger mt-1" value="Complete Work Order">
            </form>`;
    }
    view += `</div></div>`;

    return view;
  },
  after_render: async () => {}
};

export default Workorder_Details;
