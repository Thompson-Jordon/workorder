const model = require("../models/noteModel");

exports.getNotes = (req, res) => {
  let id = req.query.id;
  console.log("Trying to get notes for wo#" + id);
  model.getNotesByWOId(id, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};

exports.creatNote = (req, res) => {
  console.log("Trying to create note...");
  let note = req.body.new_note;
  let wo_id = req.body.wo_id;
  let user_id = req.body.user_id;
  model.insertNote(note, wo_id, user_id, (error, results) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      res.json(results);
    }
  });
};
