require('dotenv').config();
const express = require('express');
const path = require ('path');
const controllers = require('./controllers.js');


const port = process.env.PORT;
const app = express();
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.get('/urls', controllers.getUrls);
app.get('/urls/latest', controllers.getLatestUrl);
app.post('/urls', controllers.postUrl);

app.listen(port, () => console.log(`Listening on port: ${port}`));
