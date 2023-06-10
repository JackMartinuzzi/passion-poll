import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

function Poll({ title, options, storedVotes }) {
  const [started, setStarted] = useState(false);
  const [polled, setPolled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10);
  const [votes, setVotes] = useState(options.map((option, index) =>  ({option: option, numvotes: 0})));

  // if (storedVotes)
  const handleStartPoll = async () => {
    await setRemainingTime(10);
    setStarted(true);
    setPolled(true);
  };

  const handleVote = (index) => {
    if (started) {
      const newVotes = [...votes];
      newVotes[index].numvotes += 1;
      setVotes(newVotes);
    }
  };

  useEffect(() => {
    if (started) {
      const timer = setTimeout(() => {
        setStarted(false);
        axios.post('http://localhost:3000/postPollData', {
          title,
          votes,
        })
          .then((res) => console.log(res))
          .catch((err) => console.log(err.message));
      }, remainingTime * 1000);
      const timeLeft = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => [clearTimeout(timeLeft), clearTimeout(timer)];
    }
  }, [started, remainingTime]);

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
            <p className="votes">{votes[index].numvotes}</p>
          </div>
        ))}
      </ul>
      {started && (
      <p>
        Time Left:
        {remainingTime}
      </p>
      )}
    </div>
  );
}

export default Poll;
