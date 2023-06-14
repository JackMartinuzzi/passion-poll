import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

function Poll({
  id,
  title,
  options,
  votes,
  remainingtime,
  complete
}) {
  const [started, setStarted] = useState(complete);
  const [polled, setPolled] = useState(false);
  const [pollVotes, setPollVotes] = useState(votes);
  const [timeLeft, setTimeLeft] = useState(remainingtime);

  useEffect(() => {
    if (complete) {
      setPolled(started);
    }
  }, []);

  const handleStartPoll = async () => {
    setStarted(true);
    setPolled(true);
  };

  const handleVote = (index) => {
    if (started) {
      const newVotes = [...pollVotes];
      newVotes[index] += 1;
      setPollVotes(newVotes);
    }
  };

  useEffect(() => {
    if (started && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      axios
        .put(`http://localhost:3000/api/polls/${id}`, {
          title,
          options,
          votes: pollVotes,
          remainingtime: timeLeft,
        });
      return () => clearTimeout(timer);
    } else if (!started || timeLeft <= 0 ) {
      setStarted(false);
      axios
        .put(`http://localhost:3000/api/polls/${id}`, {
          title,
          options,
          votes: pollVotes,
          remainingtime: timeLeft,
        })
      .catch((err) => console.log(err.message));
    }
  }, [started, timeLeft]);

  return (
    <div className="poll">
      <h2>{title}</h2>
      <Button variant="contained" onClick={handleStartPoll} disabled={polled}>Start Poll</Button>
      <ul>
        {options.map((option, index) => (
          <div className="option">
            <Button
              key={index}
              className="option-button"
              variant="contained"
              color="primary"
              disabled={!started}
              onClick={() => handleVote(index)}
            >
              {option}
            </Button>
            <p className="votes">{votes[index]}</p>
          </div>
        ))}
      </ul>
      {started && (
      <p>
        Time Left:
        {timeLeft}
      </p>
      )}
    </div>
  );
}

export default Poll;
