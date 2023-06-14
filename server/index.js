require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const controllers = require('./controllers.js');

const port = process.env.PORT;
const app = express();
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/polls', async (req, res) => {
  console.log(req.body);
  controllers.postPollData(req.body, res);
});
app.get('/api/polls', async (req, res) => {
  controllers.getPollData(req, res);
});

app.put('/api/polls/:id', async (req, res) => {
  console.log(req.body);
  controllers.updatePoll(req, res);
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
