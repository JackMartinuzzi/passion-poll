-- CREATE DATABASE --
CREATE DATABASE polls;

-- USE THE DATABASE --
\c polls;

-- CREATE TABLES --
CREATE TABLE IF NOT EXISTS "polls" (
  id SERIAL PRIMARY KEY,
  polltitle VARCHAR(255) NOT NULL,
  options TEXT[] NOT NULL,
  votes INT[] NOT NULL,
  remainingTime INT NOT NULL,
  started BOOLEAN,
  created_at TIMESTAMP NOT NULL DEFAULT now();
);