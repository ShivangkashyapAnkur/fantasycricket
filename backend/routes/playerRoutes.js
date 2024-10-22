const express = require("express");
const router = express.Router();
const Player = require("../models/Player");

// GET /players - Retrieve all players
router.get("/", async (req, res) => {
  try {
    const players = await Player.find(); // Fetch all players from the database
    res.json(players); // Send back players as JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
