ALTER DATABASE gkeeper SET timezone TO 'Asia/bangkok';
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(55) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  registered_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS greenhouses(
  id SERIAL PRIMARY KEY,
  user_id INT4 REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(55) NOT NULL,
  plant VARCHAR(55) NOT NULL
);

CREATE TYPE statistic_type AS ENUM('temperature', 'brightness', 'growth', 'watering');

CREATE TABLE IF NOT EXISTS statistics(
  id SERIAL PRIMARY KEY,
  greenhouse_id INT4 REFERENCES greenhouses(id) ON DELETE CASCADE,
  type statistic_type NOT NULL,
  collected_at TIMESTAMPTZ DEFAULT NOW(),
  value FLOAT NOT NULL
);

--Create table about growth rate of plant
CREATE TABLE IF NOT EXISTS growthrate(
  id SERIAL PRIMARY KEY,
  temperature FLOAT NOT NULL,
  brightness FLOAT NOT NULL,
  weather FLOAT NOT NULL,
  differenceHeight FLOAT NOT NULL
);