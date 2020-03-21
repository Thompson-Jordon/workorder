require('dotenv').config();
const { Pool } = require("pg");
const db = process.env.DATABASE_URL || process.env.LOCALDB_URL;
const pool = new Pool({ connectionString: db });

exports.getDevicesByLocationId = (location_id, callback) => {
  let query = {
    text:
      "SELECT d.name AS device_name, d.device_id as device_id, t.name AS type  FROM ((device d INNER JOIN location l ON d.location_id = l.id) INNER JOIN device_type t ON d.type_id = t.id) WHERE d.location_id=$1",
    values: [location_id]
  };

  pool.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      callback(err, null);
    } else {
      console.log(res.rows);
      callback(null, res.rows);
    }
  });
};

exports.getDevicesByDeviceId = (device_id, callback) => {
  let query = {
    text:
      "SELECT d.name AS device_name, d.device_id as device_id, t.name AS type  FROM ((device d INNER JOIN location l ON d.location_id = l.id) INNER JOIN device_type t ON d.type_id = t.id) WHERE d.id=$1",
    values: [device_id]
  };

  pool.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      callback(err, null);
    } else {
      console.log(res.rows);
      callback(null, res.rows[0]);
    }
  });
};

exports.insertDevice = (body, callback) => {
  let query = {
    text:
      "INSERT INTO device (name, device_id, is_sched, frequency, type_id, location_id) VALUES ($1, $2, $3, $4, $5, $6)",
    values: [body.device, body.device_id, body.is_sched, body.frequency, body.type, body.location]
  };

  pool.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      callback(err, null);
    } else {
      console.log(res.rows);
      callback(null, { success: true });
    }
  });
};
