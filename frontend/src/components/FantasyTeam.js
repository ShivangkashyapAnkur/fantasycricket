import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FantasyTeam() {
  const [players, setPlayers] = useState([]);  // State to store the list of players
  const [selectedPlayers, setSelectedPlayers] = useState([]); // State to store selected players
  const [teamName, setTeamName] = useState('');  // State for the team name
  const [team, setTeam] = useState(null);        // State to store created team

  // Fetch players when the component mounts
  useEffect(() => {
    axios.get('/players').then((res) => setPlayers(res.data)); // Fetch players from backend
  }, []);

  // Function to handle player selection
  const handlePlayerSelect = (player) => {
    if (selectedPlayers.length < 11) {
      setSelectedPlayers([...selectedPlayers, player]); // Add player to the selected list
    }
  };

  // Function to create a new team
  const createTeam = () => {
    axios.post('/teams', {
      name: teamName,
      players: selectedPlayers.map(p => p._id),
    })
    .then((res) => setTeam(res.data))  // Save created team in state
    .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Create Your Fantasy Team</h1>
      <input
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}  // Handle team name input
      />
      
      <h2>Available Players</h2>
      <ul>
        {players.map((player) => (
          <li key={player._id} onClick={() => handlePlayerSelect(player)}>
            {player.name} - {player.points} points
          </li>
        ))}
      </ul>
      <button onClick={createTeam}>Create Team</button>

      {team && (
        <div>
          <h2>{team.name}</h2>
          <ul>
            {team.players.map((player) => (
              <li key={player._id}>{player.name} - {player.points}</li>
            ))}
          </ul>
          <p>Total Points: {team.totalPoints}</p>
        </div>
      )}
    </div>
  );
}

export default FantasyTeam;
