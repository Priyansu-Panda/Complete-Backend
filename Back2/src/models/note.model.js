// Define the structure of our database ... before we proceed storing data in the db

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
})

const noteModel = mongoose.model("note", noteSchema);

module.exports = noteModel;

/*
    Crud operations on db will be done via the model 
*/
