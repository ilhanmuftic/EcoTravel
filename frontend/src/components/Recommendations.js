import React from 'react';
import "../Recommendations.css";

const Recommendations = () => {
  // Dummy recommendations data
  const recommendations = [
    { title: "Try Speed Running", description: "Compete against the clock and improve your skills!" },
    { title: "Join a Clan", description: "Find like-minded players and team up for rewards." },
    { title: "New Challenges Available", description: "Complete new tasks and earn exclusive badges." },
    { title: "Daily Login Bonus", description: "Don't forget to claim your daily rewards!" }
  ];

  return (
    <div className="recommendations-container">
      <h2>Recommendations</h2>
      <ul className="recommendations-list">
        {recommendations.map((rec, index) => (
          <li key={index} className="recommendation-item">
            <h3 className="rec-title">{rec.title}</h3>
            <p className="rec-description">{rec.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
