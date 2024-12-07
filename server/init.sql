SELECT 'CREATE DATABASE clubtortue'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'clubtortue')\gexec

\c clubtortue;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
