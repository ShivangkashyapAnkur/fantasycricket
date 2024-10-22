// Importing mongoose to define schemas
const mongoose = require("mongoose");

// Defining the Player schema with relevant attributes
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the player
  points: { type: Number, required: true }, // Player's total points
  position: { type: String, required: true }, // Position (e.g., Forward, Midfielder)
  team: { type: String, required: true }, // Team name (e.g., Manchester United)
});

// Export the Player model
module.exports = mongoose.model("Player", playerSchema);
