const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  max: 20, // number of allowed connections (default 10)
  connectionTimeoutMillis: 2000, // time in ms to wait for connection to form (default 0)
  idleTimeoutMillis: 10000, // time connection can sit idle in pool before discarding (d: 10000),
  allowExitOnIdle: true, // can node event loop exit process on all connection idle?
}, console.log(`connected to db: ${process.env.DB_NAME}`));

module.exports = {
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
  async getPollData(callback) {
    // JSON_AGG(choices.votes) AS votes
    const queryStr = `SELECT
        polls.polltitle AS title,
        JSON_AGG(choices.choice_name) AS options,
        JSON_AGG(choices.votes) AS votes
      FROM polls
      LEFT JOIN choices
      ON polls.id = choices.poll_id
      GROUP BY polls.id, polls.polltitle`;
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
    const { title } = req;
    const votesArray = req.votes.map((vote) => `('${vote.option}', ${vote.numvotes})`).join(', ');
    console.log(title, votesArray);

    const queryStr = `WITH new_poll AS (
      INSERT INTO polls (polltitle)
      VALUES (\$1)
      RETURNING id
    )
    INSERT INTO choices (poll_id, choice_name, votes)
    SELECT
      new_poll.id,
      vote_data.option,
      vote_data.numvotes
    FROM
      new_poll,
     (VALUES ${votesArray}) AS vote_data(option, numvotes);`;
    await pool.query(queryStr, [title], (err, results) => {
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
};
