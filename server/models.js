const pool = require('./database');

module.exports = {
  async postData({ url, title, targetUrl }, callback) {
    const queryStr = `INSERT INTO urls (url, parenturl, title)
    VALUES (${url}, ${targetUrl}, ${title})`
    await pool.query(queryStr, (err, results) => {
      if (err) {
        console.log('data insert error:', err.message);
      } else if (results.rows) {
        console.log('data insert success');
        callback(null, results.rows);
      }
    });
  },
  async postImgData({ imagesrc, targetUrl }, callback) {
    const queryStr = `INSERT INTO images (imagesrc, parenturl)
    VALUES (${imagesrc}, ${targetUrl})`;
    await pool.query(queryStr, (err, results) => {
      if (err) {
        console.log('image insert error:', err.message);
      } else if (results.rows) {
        callback(null, results.rows);
      }
    });
  },

  async getUrlData(callback) {
    const queryStr = 'SELECT title, url FROM results WHERE id = LAST(id)';
    await pool.query(queryStr, (err, results) => {
      if (err) {
        callback(err, null);
      } else if (results.rows) {
        callback(null, results.rows);
      }
    });
  },
};
