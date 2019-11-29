CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(55) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS greenhouses(
  id SERIAL PRIMARY KEY,
  user_id INT4 REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(55) NOT NULL,
  plant VARCHAR(55) NOT NULL
);

CREATE TYPE statistic_type AS ENUM('temperature', 'brightness');

CREATE TABLE IF NOT EXISTS statistics(
  id SERIAL PRIMARY KEY,
  greenhouse_id INT4 REFERENCES greenhouses(id) ON DELETE CASCADE,
  type statistic_type NOT NULL,
  collected_at TIMESTAMP DEFAULT NOW(),
  value FLOAT NOT NULL
);

