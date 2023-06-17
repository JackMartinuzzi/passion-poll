-- CREATE DATABASE --
CREATE DATABASE polls;

-- USE THE DATABASE --
\c polls;

-- CREATE TABLES --
CREATE TABLE IF NOT EXISTS "polls" (
  id SERIAL PRIMARY KEY,
  polltitle VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "choices" (
  id SERIAL PRIMARY KEY,
  poll_id int,
  choice_name VARCHAR(50),
  votes INT,
  FOREIGN KEY (poll_id) REFERENCES polls(id)
);
