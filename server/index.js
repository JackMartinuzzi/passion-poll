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

app.post('/scrape', async (req, res) => {
  controllers.postUrl(req.body.url, res);
});
app.get('/scraped-data', async (req, res) => {
  controllers.getUrlData(req, res);
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
