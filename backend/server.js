// Importing necessary modules
const express = require("express");
const mongoose = require("mongoose");
const playerRoutes = require("./routes/playerRoutes");
const teamRoutes = require("./routes/teamRoutes");

// Initialize express app
const app = express();
app.use(express.json()); // Parses incoming JSON requests

// Connect to MongoDB (replace connection string with your MongoDB URI if needed)
mongoose.connect("mongodb://localhost/fantasy-game", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Routes
app.use("/players", playerRoutes); // All player-related routes
app.use("/teams", teamRoutes); // All team-related routes

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
