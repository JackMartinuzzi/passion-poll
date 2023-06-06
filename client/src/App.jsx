import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bubble from './Bubble.jsx';
import InputForm from './InputForm.jsx';

function App() {
  return (
    <div>
      <InputForm />
      <Bubble/>
    </div>
  );
}

export default App;
