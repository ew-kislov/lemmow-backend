--
-- company table
--

DROP TABLE IF EXISTS lm_company CASCADE;

CREATE TABLE lm_company (
    id SERIAL,
    name VARCHAR(50) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    owner_id INT NOT NULL,

    CONSTRAINT lm_company_pk PRIMARY KEY(id)
);

-- trigger on insert

CREATE OR REPLACE FUNCTION set_company_initial_data() RETURNS TRIGGER AS $$
BEGIN
    NEW.creation_date := CURRENT_TIMESTAMP;
    UPDATE lm_user SET company_id = NEW.id WHERE id = NEW.owner_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER company_insert_trigger AFTER INSERT ON lm_company
FOR EACH ROW EXECUTE PROCEDURE set_company_initial_data();

--
-- user table
--

DROP TABLE IF EXISTS lm_user CASCADE;

CREATE TABLE lm_user (
    id SERIAL,
    first_name VARCHAR(50) NOT NULL,
    second_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    company_id INT,
    registration_date TIMESTAMP NOT NULL,
    login_date TIMESTAMP,

    CONSTRAINT lm_user_pkey PRIMARY KEY(id),
    CONSTRAINT lm_user_company_fkey FOREIGN KEY(company_id) REFERENCES lm_company(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- trigger on insert

CREATE OR REPLACE FUNCTION set_user_registration_date() RETURNS TRIGGER AS $$
BEGIN
    NEW.registration_date := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_insert_trigger BEFORE INSERT ON lm_user
FOR EACH ROW EXECUTE PROCEDURE set_user_registration_date();