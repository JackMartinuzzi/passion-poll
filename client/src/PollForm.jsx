import React, { useState } from 'react';
import {
  Button,
  FormControl,
  TextField,
  Input,
  FormHelperText,
} from '@mui/material';

function PollForm({ handleCreatePoll }) {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['']);
  const [votes, setVotes] = useState([]);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreatePoll({ title, options, votes, remainingtime: 10, started: false });
    setTitle('');
    setOptions(['']);
    setVotes([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="poll-title-section">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Poll Title" required>Poll Title</Input>
        <FormHelperText id="poll-title-helper-text">Give your poll a title</FormHelperText>
        <Button className="add-choice-button" variant="contained" onClick={addOption}>Add choice</Button>
      </div>
      {options.map((option, index) => (
        <TextField
          key={index}
          label={`Option ${index + 1}`}
          type="text"
          value={option}
          required
          onChange={(e) => {
            const newOptions = [...options];
            const newVotes = [...votes];
            newOptions[index] = e.target.value;
            newVotes[index] = 0;
            setOptions(newOptions);
            setVotes(newVotes);
          }}
        />
      ))}
      <div className="create-button">
        <Button variant="contained" type="submit">Create Poll</Button>
      </div>
    </form>
  );
}

export default PollForm;
