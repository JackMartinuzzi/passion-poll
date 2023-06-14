const { Pool } = require('pg');

const pool = new Pool({
  user: 'jackuzzi',
  host: 'localhost',
  database: 'polls',
  password: 'Sub-0physics',
  port: 5432,
  max: 20, // number of allowed connections (default 10)
  connectionTimeoutMillis: 2000, // time in ms to wait for connection to form (default 0)
  idleTimeoutMillis: 10000, // time connection can sit idle in pool before discarding (d: 10000),
  allowExitOnIdle: true, // can node event loop exit process on all connection idle?
}, console.log(`connected to db: ${process.env.DB_NAME}`));

module.exports = {
  async getPollData(callback) {
    const queryStr = `SELECT * FROM polls
    ORDER BY created_at DESC;`;
    await pool.query(queryStr, (err, results) => {
      if (err) {
        callback(err);
      } else if (results.rows) {
        console.log('Success');
        callback(null, results.rows);
      }
    });
  },
  async postPollData(req, callback) {
    const { title, options, votes, remainingtime, started } = req;
    console.log(req);

    const queryStr = `
    INSERT INTO polls (polltitle, options, votes, remainingTime, started, created_at) VALUES (\$1, \$2, \$3, \$4, \$5, NOW())`;
    await pool.query(queryStr, [title, options, votes, remainingtime, started], (err, results) => {
      if (err) {
        callback(err);
      } else if (results.rowCount > 0) {
        console.log('Success');
        callback(null, results.rows);
      } else {
        console.log('No rows affected');
        callback(null, []);
      }
    });
  },
  async updatePoll(req, callback) {
    const { id } = req.params;
    const { title, options, votes, remainingtime } = req.body;
    console.log(title, options, votes, remainingtime, id);
    const queryStr = `UPDATE polls SET title = \$1, options = \$2, votes = \$3, remainingTime = \$4 WHERE id = \$5`;

    await pool.query(queryStr, [title, options, votes, remainingtime, id], (err, results) => {
      if (err) {
        callback(err);
      } else if (results.rowCount > 0) {
        callback(null, results.rows);
      } else {
        console.log('No rows affected');
        callback(null, []);
      }
    });
  },
};
