const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    
    // note: {

    //     title: String,

    //     body: String
    // }

    title: {

        type: String

    },

    body: {

        type: String

    }

});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;

// const noteSchema = new mongoose.Schema({
//     note: {
//                 title: String,
//                 body: String
//             }
// })

// module.exports = mongoose.model("Note", noteSchema);