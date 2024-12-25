import React, { useState } from 'react';
import EntriesChart from '../components/EntriesChart';
import MoodEntryForm from '../components/MoodEntryForm';
import './Home.css'; // Import CSS for Home



const Home = () => {
  const [entries, setEntries] = useState([]);
  

  const handleAddEntry = (entry) => {
    setEntries([entry, ...entries]);
  };

  // Optionally, you can process the entries to generate data suitable for the chart
  const processEntriesForChart = () => {
    return entries.map(entry => ({
      date: entry.date,
      moodScore: entry.moodScore // You might need to calculate or map this from the mood entry
    }));
  };

  return (
    <div className="home-container">
      <div className="nav-bar">
        {/* <button onClick={() => navigate("/signup")}>Signup</button> */}
        {/* <button onClick={() => navigate("/login")}>Login</button> */}
      </div>
      <h2>Welcome to Your Mental Health Journal</h2>
      <p>Track your mental health, express your thoughts, and discover resources for your well-being.</p>
      
      <EntriesChart data={processEntriesForChart()} /> {/* Pass data to chart component */}

      <MoodEntryForm onAddEntry={handleAddEntry} />

      <div className="entries-list">
        <h3>Recent Entries</h3>
        {entries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          <ul>
            {entries.map((entry, index) => (
              <li key={index} className="entry-item">
                <strong>{entry.date}</strong>
                <p><em>Mood:</em> {entry.mood}</p>
                <p><em>Details:</em> {entry.details}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;