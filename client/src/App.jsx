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

  const handleCreatePoll = (poll) => {
    console.log(poll);
    setPolls([poll, ...polls]);
    handleClick();
  };

  return (
    <div className="main-div">
      <h1 className="main-title">Passion Poll</h1>
      <Button
        className="create-poll-button"
        variant="contained"
        onClick={handleClick}
      >
        Create Poll
      </Button>
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
            title={poll.title}
            options={poll.options}
            storedVotes={storedVotes}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
