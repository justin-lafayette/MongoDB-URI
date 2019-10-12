const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SummarySchema = new Schema({

    summary: String

});

const Summary = mongoose.model("Summary", SummarySchema);

module.exports = Summary;