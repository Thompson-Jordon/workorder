let getCurrentUser = async () => {
   try {
      let response = await fetch(`/CurrentUser`, { method: "GET" });
      const json = await response.json();
      return json;
    } catch (err) {
      console.log("Error getting json", err);
    }
}

let Change_Password = {
  render: async () => {
    let user = getCurrentUser();
    let view = /*html*/ 
    `<div id="login" class="container pt-5">
        <div id="login-row" class="row justify-content-center align-items-center">
           <div id="login-column" class="col-md-6">
              <div id="login-box" class="col-md-12">
                 <form id="changePass" class="form" method="post">
                    <h3 class="text-center text-info">Change Password</h3>
                    <div class="form-group">
                       <label for="old_pass" class="text-info">Enter current password:</label><br>
                       <input type="password" name="old_pass" id="old_pass" class="form-control" required>
                    </div>
                    <div class="form-group">
                       <label for="pass1" class="text-info">Enter new password:</label><br>
                       <input type="password" name="pass1" id="pass1" class="form-control" required>
                    </div>
                    <div class="form-group">
                       <label for="pass2" class="text-info">Enter new password:</label><br>
                       <input type="password" name="pass2" id="pass2" class="form-control" required>
                    </div>
                    <div class="form-group">
                       <input type="button" id="changePassBtn" class="btn btn-info btn-md" value="Submit">
                    </div>
                    <input type="hidden" id="user" value="${user.id}">
                 </form>
              </div>
           </div>
        </div>
     </div>`;

    return view;
  },
  after_render: async () => {}
};

export default Change_Password;
