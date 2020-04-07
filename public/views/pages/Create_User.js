let Create_User = {
  render: async () => {
    let view = /*html*/ 
    `<div class="jumbotron jumbotron-fluid">
       <div class="container">
         <h1 class="display-3">Add New User</h1>
       </div>
     </div>
     <form id="userForm" action="" method="post">
       <div class="container">
         <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" class="form-control" required>
         </div>
         <div class="form-group">
            <label for="first_name">First Name:</label>
            <input type="text" id="first_name" name="first_name" class="form-control" required>
         </div>
         <div class="form-group">
            <label for="last_name">Last Name:</label>
            <input type="text" id="last_name" name="last_name" class="form-control" required>
         </div>
         <div class="form-group">
            <label for="is_admin">Priveledges:</label>
            <select type="text" id="is_admin" name="is_admin" class="form-control">
               <option value="False">Default</option>
               <option value="True">Admin</option>
            </select>
         </div>
         <button type="button" id="newUserBtn" class="btn btn-info">Add User</button>
      </div>
     </form>`;

    return view;
  },
  after_render: async () => {}
};

export default Create_User;
