/* Replace with your SQL commands */
CREATE TYPE roleType AS ENUM('superadmin','admin');
CREATE TABLE IF NOT EXISTS admins (
    id VARCHAR PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role roleType  NOT NULL,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updatedAt  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);