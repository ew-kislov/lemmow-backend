DROP TABLE IF EXISTS lm_user;

CREATE TABLE lm_user (
    id SERIAL,
    first_name VARCHAR(50) NOT NULL,
    second_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    registration_date TIMESTAMP NOT NULL,
    login_time TIMESTAMP NOT NULL,
    logout_time TIMESTAMP NOT NULL,

    CONSTRAINT lm_user_pkey PRIMARY KEY(id)
);