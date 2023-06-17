import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  Typography,
  Box,
  FormControl,
} from '@mui/material';
import { modalStyle } from './muiStyles';
import PollForm from './PollForm.jsx';
import Poll from './Poll.jsx';

function App() {
  const [open, setOpen] = useState(false);
  const [polls, setPolls] = useState([]);
  const [storedVotes, setStoredVotes] = useState([]);
  const handleClick = () => setOpen(!open);

  // // useEffect to load historical polls
  // useEffect(async () => {
  //   await axios.get('http://localhost:3000/pollData')
  //     .then((res) => {
  //       console.log(res.data);
  //       setPolls([...polls, ...res.data]);
  //     })
  //     .catch((err) => console.log(err.message));
  // }, []);

  const handleCreatePoll = async (poll) => {
    handleClick();
    try {
      const response = await axios.post('/api/polls', poll);
      console.log('Poll created:', response.data);
    } catch (error) {
      console.error('Error creating poll:', error);
    }
    setPolls([poll, ...polls]);
  };

  return (
    <div className="main-div">
      <div className="title">
        <h1 className="main-title">Passion Poll</h1>
        <div className="top-buttons">
          <Button
            className="create-poll-button"
            variant="contained"
            onClick={handleClick}
          >
            Create Poll
          </Button>
          <Button
            className="participants"
            variant="contained"
            onClick={handleClick}
          >
            Invite Participants
          </Button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClick}
      >
        <Box sx={modalStyle} className="create-poll-modal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Poll Creator
          </Typography>
          <PollForm handleCreatePoll={handleCreatePoll} />
        </Box>
      </Modal>
      <div className="polls">
        {polls.map((poll, index) => (
          <Poll
            key={index}
            id={poll.id}
            title={poll.polltitle}
            options={poll.options}
            votes={poll.votes}
            remainingtime={poll.remainingtime}
            complete={poll.started}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
