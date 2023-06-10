require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const models = require('./models');

module.exports = {
  postUrl: async (targetUrl, res) => {
    try {
      // get response from target
      const response = await axios.get(targetUrl);

      // store html data in cheerio load
      const $ = await cheerio.load(response.data);

      // get links and images
      const links = [];
      const images = [];

      // 'a' tag for links
      $('a').each((index, element) => {
        const url = $(element).attr('href');
        if (url.includes('http')) {
          links.push({
            targetUrl: JSON.stringify(targetUrl),
            title: JSON.stringify($(element).text()),
            url,
          });
        }
      });

      // 'img' tag for images
      $('img').each((index, element) => {
        images.push({
          imagesrc: JSON.stringify($(element).attr('src')),
          targetUrl: JSON.stringify(targetUrl),
        });
      });

      // send scraped data to db
      for (let i = 0; i < links.length; i++) {
        models.postData(links[i], (err, data) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log(data);
          }
        });
      }
      for (let i = 0; i < images.length; i++) {
        models.postImgData(images[i], (err, data) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log(data);
          }
        });
      }

      // send response data
      console.log('request parsed from', targetUrl);
      res.json({ links, images });
    } catch (err) {
      res.status(500).send({ err: 'Scrape failed ' });
    }
  },

  getUrlData: async (req, res) => {
    models.getUrlData((err, data) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(data);
      }
    });
  },
};
