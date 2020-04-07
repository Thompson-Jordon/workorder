const model = require("../models/userModel");
const session = require("express-session");
const bcrypt = require("bcrypt");

exports.getUsers = (req, res) => {
  console.log("Trying to get all users...");
  model.getAllUsers((error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};

exports.getUserById = (req, res) => {
  let id = req.body.user_id;
  console.log("Trying to get User:", id);
  model.getUserById(id, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};

exports.getUserByUsername = (req, res, callback) => {
  let username = req.body.username;
  console.log("Trying to get " + username);
  model.getUserByUsername(username, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      callback(results);
    }
  });
};

exports.createUser = (req, res) => {
  let username = req.body.username;
  console.log("Trying to create User:", username);
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let is_admin = req.body.is_admin;
  let params = {
    username: username,
    first_name: first_name,
    last_name: last_name,
    is_admin: is_admin,
  };
  model.insertUser(params, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};

exports.getCurrentUser = (req, res) => {
  let user = {
    id: req.session.user_id,
    username: req.session.username,
    first_name: req.session.first_name,
    last_name: req.session.last_name,
    is_admin: req.session.is_admin,
  };

  res.json(user);
};

exports.login = (req, res) => {
  if (req.success == true) {
    req.session.username = req.user.username;
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.user_id = req.user.user_id;
    req.session.is_admin = req.user.is_admin;
    req.session.logged_in = true;
    req.session.save();
    res.redirect("/");
  } else {
    res.json({ message: "Username or password is incorrect." });
  }
};

exports.logout = (req, res, next) => {
  const user = req.session.username;
  console.log("USER: " + user);
  if (user != "" && typeof user !== "undefined") {
    req.session.destroy();
    res.redirect("/login");
  } else {
    res.json({ success: false });
  }
};

exports.register = (req, res) => {
  model.getUserByToken(req.body.token, async (error, user) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      try {
        const hashPass = await bcrypt.hash(req.body.password, 10);
        let params = {
          hashPass: hashPass,
          userId: user.id,
        };
        model.registerUser(params, (err, result) => {
          if (err) {
            console.log("Error: " + error);
          } else {
            res.redirect("/login");
          }
        });
      } catch {
        res.redirect("/register");
      }
    }
  });
};

exports.checkCred = (req, res, next) => {
  const password = req.body.password;
  this.getUserByUsername(req, res, async (user) => {
    if (await bcrypt.compare(password, user.password)) {
      req.success = true;
      req.user = user;
      next();
    } else {
      req.redirect("/login", {
        success: false,
        message: "Username or password is incorrect",
      });
    }
  });
}

exports.isAuth = (req, res, next) => {
  if (typeof req.session.username !== "undefined") {
    return next();
  } else {
    res.redirect('/login');
  }
}

exports.isNotAuth = (req, res, next) => {
  if (typeof req.session.username !== "undefined") {
    res.redirect('/');
  } else {
    return next();
  }
}