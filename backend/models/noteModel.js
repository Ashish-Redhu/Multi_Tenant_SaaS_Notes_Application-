const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    heading: String, 
    description: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true}
});

const NoteModel = mongoose.model("NoteModel", noteSchema);
module.exports = NoteModel;