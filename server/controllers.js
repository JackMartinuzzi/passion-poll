require('dotenv').config();
const models = require('./models');

module.exports = {
  getUrlData: async (req, res) => {
    models.getUrlData((err, data) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(data);
      }
    });
  },
  getPollData: async (req, res) => {
    models.getPollData((err, data) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(data);
      }
    });
  },
  postPollData: async (req, res) => {
    models.postPollData(req, (err) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(201);
      }
    });
  },
  updatePoll: async (req, res) => {
    models.updatePoll(req, (err) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(201);
      }
    });
  },
};
