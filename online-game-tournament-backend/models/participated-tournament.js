const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ParticipatedTournamentSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  tournament_id: {
    type: String,
    required: true
  },
  tournament_type: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ParticipatedTournament = mongoose.model("participated-tournament", ParticipatedTournamentSchema);
