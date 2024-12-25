import React, { useState } from 'react';
import './MoodEntryForm.css'; // Import CSS for MoodEntryForm

const MoodEntryForm = ({ onAddEntry }) => {
  const [date, setDate] = useState('');
  const [mood, setMood] = useState('');
  const [details, setDetails] = useState('');

  // Convert mood to a numerical score for the chart
  const moodToScore = (mood) => {
    switch (mood.toLowerCase()) {
      case 'happy': return 5;
      case 'neutral': return 3;
      case 'sad': return 1;
      case 'angry': return 2;
      case 'excited': return 4;
      case 'anxious': return 2;
      case 'relaxed': return 4;
      default: return 0; // If the mood doesn't match, return a score of 0
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && mood && details) {
      onAddEntry({ date, mood, details, moodScore: moodToScore(mood) });
      setDate('');
      setMood('');
      setDetails('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <label>
        Mood:
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          required
        >
          <option value="">Select a mood</option>
          <option value="happy">Happy</option>
          <option value="neutral">Neutral</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
          <option value="excited">Excited</option>
          <option value="anxious">Anxious</option>
          <option value="relaxed">Relaxed</option>
        </select>
      </label>
      <label>
        Details:
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        ></textarea>
      </label>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default MoodEntryForm;
