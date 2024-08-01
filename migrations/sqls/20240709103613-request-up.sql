/* Replace with your SQL commands */
CREATE TYPE process AS ENUM ('emergency','standard','expedited','walk_in');

CREATE TABLE IF NOT EXISTS request(
    id VARCHAR PRIMARY KEY,
    user_Id VARCHAR REFERENCES client(id)ON DELETE CASCADE,
    firstname VARCHAR (255) NOT NULL,
    lastname VARCHAR (255) NOT NULL,
    organization VARCHAR (255)NOT NULL,
    faxnumber VARCHAR(255),
    mailingAdddress1 VARCHAR(255),
    mailingAdddress2 VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zipCode VARCHAR(255),
    country VARCHAR(255),
    request VARCHAR(10000),
    expedited_process process ,
    phonenumber VARCHAR (255)NOT NULL,
    justification VARCHAR(10000),
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updatedAt  TIMESTAMPTZ NOT NULL DEFAULT NOW()
)