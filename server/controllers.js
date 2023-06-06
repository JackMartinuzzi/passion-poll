require('dotenv').config();
const axios = require('axios');
const models = require('./models');

module.exports = {
  getUrls: async (req, res) => {
    await models.getUrls(req.query, (err, data) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(data);
      }
    });
  },

  getLatestUrl: async (req, res) => {
    await models.getLatestUrl(req.query, (err, data) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(data);
      }
    });
  },

  postUrl: async (req, res) => {
    await models.postUrl(req.query, (err, data) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(201).send(data);
      }
    });
  },
}