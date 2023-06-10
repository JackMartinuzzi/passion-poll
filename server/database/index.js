require('dotenv').config();
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
});

module.exports = pool;
