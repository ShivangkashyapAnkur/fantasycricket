const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const Player = require("../models/Player");

// POST /teams - Create a new team
router.post("/", async (req, res) => {
  const { name, players } = req.body;

  // Validate player limit
  if (players.length > 11) {
    return res.status(400).json({ message: "Max 11 players allowed." });
  }

  // Calculate total points of the selected players
  const totalPoints = await Player.aggregate([
    {
      $match: { _id: { $in: players.map((p) => mongoose.Types.ObjectId(p)) } },
    },
    { $group: { _id: null, total: { $sum: "$points" } } },
  ]);

  // Create and save a new team
  const team = new Team({
    name,
    players,
    totalPoints: totalPoints[0]?.total || 0,
  });

  await team.save(); // Save team to the database
  res.status(201).json(team); // Return created team
});

// GET /teams/:id - Retrieve a specific team by ID
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("players"); // Find team by ID and populate player details
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team); // Return team as JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
