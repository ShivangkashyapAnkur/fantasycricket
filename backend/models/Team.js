// Importing mongoose to define schemas
const mongoose = require("mongoose");

// Defining the Team schema
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Team name
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }], // Array of player IDs
  totalPoints: { type: Number, default: 0 }, // Team's total points
});

// Export the Team model
module.exports = mongoose.model("Team", teamSchema);
