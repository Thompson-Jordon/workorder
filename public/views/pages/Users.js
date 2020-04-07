let getUsers = async () => {
   try {
     let response = await fetch("/Users", { method: "GET" });
     const json = await response.json();
     return json;
   } catch (err) {
     console.log("Error getting json", err);
   }
 };
 
 let Users = {
   render: async () => {
     let rows = await getUsers();
     let view = /*html*/ `<div class="jumbotron jumbotron-fluid bg-secondary">
     <div class="container form-inline border-secondary rounded bg-light py-3">
           <a class="btn btn-info form-control mb-3" href="#/create_user" role="button">Add User</a>
        <div class="container">
           <table id="myTable" class="table table-striped table-hover table-sm">
              <thead>
                 <tr>
                    <th onclick="sortTable(0)">Username</th>
                    <th onclick="sortTable(1)">Name</th>
                    <th onclick="sortTable(2)">Permissions</th>
                    <th onclick="sortTable(3)">Active</th>
                 </tr>
              </thead>
              <tbody id="tableBody">`;
     rows.forEach(row => {
       view += `<tr class="" href="#/user_details/${row.id}">
        <td>${row.username}</td>
        <td>${row.first_name} ${row.last_name}</td>
        <td>${row.is_admin ? "Admin" : "Default"}</td>
        <td>${row.is_active ? "Yes" : "Token: " + row.token}</td>
     </tr>`;
     });
     view += `</tbody></table></div></div></div>`;
 
     return view;
   },
   after_render: async () => {}
 };
 
 export default Users;
 