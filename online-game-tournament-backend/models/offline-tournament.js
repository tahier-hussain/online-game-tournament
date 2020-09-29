const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const OfflineTournamentSchema = new Schema({
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
  address: {
    type: String,
    required: false
  },
  latitude: {
    type: String,
    required: false
  },
  longitude: {
    type: String,
    required: false
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = OfflineTournament = mongoose.model("offline-tournament", OfflineTournamentSchema);
