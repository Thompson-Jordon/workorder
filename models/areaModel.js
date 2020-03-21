const {Pool} = require("pg");
const db = process.env.DATABASE_URL;
console.log("DB URL:", db);
const pool = new Pool({connectionString: db});

exports.insertAreaByName = (name, callback) => {
   callback(null, {success: true});

}