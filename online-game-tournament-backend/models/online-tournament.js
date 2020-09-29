const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const OnlineTournamentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  entry_fee: {
    type: String,
    required: true
  },
  no_of_slots: {
    type: String,
    required: true
  },
  no_of_slots_available: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  event_date: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = OnlineTournament = mongoose.model("online-tournament", OnlineTournamentSchema);
