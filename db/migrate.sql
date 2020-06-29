--
-- Configure DB
--

CREATE EXTENSION pgcrypto;

--
-- company table
--

DROP TABLE IF EXISTS lm_company CASCADE;

CREATE TABLE lm_company (
    id SERIAL,
    name VARCHAR(20) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    owner_id INT NOT NULL,

    CONSTRAINT lm_company_pk PRIMARY KEY(id)
);

--
-- user table
--

DROP TABLE IF EXISTS lm_user CASCADE;

CREATE TABLE lm_user (
    id SERIAL,
    first_name VARCHAR(20) NOT NULL,
    second_name VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password TEXT NOT NULL,
    phone VARCHAR(20),
    company_id INT,
    registration_date TIMESTAMP NOT NULL,
    login_date TIMESTAMP,

    CONSTRAINT lm_user_pkey PRIMARY KEY(id),
    CONSTRAINT lm_user_company_fkey FOREIGN KEY(company_id) REFERENCES lm_company(id) ON DELETE CASCADE ON UPDATE CASCADE
);