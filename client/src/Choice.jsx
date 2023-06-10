import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@mui/material';

function Choice({  }) {
  return (
    <div className="choice-form">
      <Input id="poll-choice" placeholder="Choice title" />
      <Button variant="outlined" onClick={removeChoice(e)}>X</Button>
    </div>
  );
}

export default Choice;
