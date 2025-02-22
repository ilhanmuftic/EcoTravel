import React from 'react';
import "../Leaderboard.css";

const Leaderboard = () => {
  // Dummy data for leaderboard
  const users = [
    { username: "Otorina", score: 1500 },
    { username: "Player1", score: 1200 },
    { username: "GamerX", score: 1100 },
    { username: "SpeedRunner", score: 1050 },
    { username: "Newbie", score: 900 },
  ];

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <ul className="leaderboard-list">
        {users.map((user, index) => (
          <li key={index} className="leaderboard-item">
            <span className="rank">#{index + 1}</span>
            <span className="username">{user.username}</span>
            <span className="score">{user.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
