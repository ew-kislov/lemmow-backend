--
-- COMPANY
--

DROP TABLE IF EXISTS lm_company CASCADE;

CREATE TABLE lm_company (
    id SERIAL,
    name VARCHAR(20) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT lm_company_pkey PRIMARY KEY(id)
);

--
-- COMPANY ROLES SYSTEM
--


DROP TABLE IF EXISTS lm_basic_role CASCADE;

CREATE TABLE lm_basic_role (
    id SERIAL,
    name TEXT NOT NULL,

    CONSTRAINT lm_basic_role_pkey PRIMARY KEY(id)
);

INSERT INTO 
    lm_basic_role(name)
VALUES
    ('CEO'), ('CTO');

--
--

DROP TABLE IF EXISTS lm_role CASCADE;

CREATE TABLE lm_role (
    id SERIAL,
    name TEXT NOT NULL,
    company_id INTEGER,

    CONSTRAINT lm_role_pkey PRIMARY KEY(id),
    CONSTRAINT lm_role_user_fkey FOREIGN KEY(company_id) REFERENCES lm_company(id) ON DELETE CASCADE ON UPDATE CASCADE
);


--
-- COMPANY PERMISSIONS
--


DROP TABLE IF EXISTS lm_company_permission CASCADE;

CREATE TABLE lm_company_permission (
    id SERIAL,
    name TEXT NOT NULL,

    CONSTRAINT lm_company_permission_pkey PRIMARY KEY(id)
);

INSERT INTO
    lm_company_permission(name)
VALUES
    ('Manage company information'),
    ('Manage company roles'),
    ('View company roles'),
    ('Manage your employees'),
    ('Manage all employees'),
    ('View employees'),
    ('Manage our teams'),
    ('Manage all teams'),
    ('View teams'),
    ('View company logs');

--
--

DROP TABLE IF EXISTS lm_basic_role_company_permission_join CASCADE;

CREATE TABLE lm_basic_role_company_permission_join (
    role_id INTEGER NOT NULL,
    permission_id INTEGER NOT NULL,

    CONSTRAINT lm_basic_role_company_permission_join_role_fkey FOREIGN KEY(role_id) REFERENCES lm_basic_role(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT lm_basic_role_company_permission_join_company_permission_fkey FOREIGN KEY(permission_id) REFERENCES lm_company_permission(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO
    lm_basic_role_company_permission_join(role_id, permission_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (1, 8),
    (1, 9),
    (1, 10);

--
--

DROP TABLE IF EXISTS lm_role_company_permission_join CASCADE;

CREATE TABLE lm_role_company_permission_join (
    role_id INTEGER NOT NULL,
    permission_id INTEGER NOT NULL,

    CONSTRAINT lm_role_company_permission_join_role_fkey FOREIGN KEY(role_id) REFERENCES lm_role(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT lm_role_company_permission_join_company_permission_fkey FOREIGN KEY(permission_id) REFERENCES lm_company_permission(id) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- USER TABLE
--

DROP TABLE IF EXISTS lm_user CASCADE;

CREATE TABLE lm_user (
    id SERIAL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password TEXT NOT NULL,
    phone VARCHAR(20),
    company_id INTEGER,
    role_id INTEGER,
    invitor_id INTEGER,
    registration_date TIMESTAMP NOT NULL,
    last_activity_date TIMESTAMP,

    CONSTRAINT lm_user_pkey PRIMARY KEY(id),
    CONSTRAINT lm_user_company_fkey FOREIGN KEY(company_id) REFERENCES lm_company(id),
    CONSTRAINT lm_user_role_fkey FOREIGN KEY(role_id) REFERENCES lm_role(id),
    CONSTRAINT lm_user_invitor_fkey FOREIGN KEY(invitor_id) REFERENCES lm_user(id)
);

--
-- COMPANY LOGGING SYSTEM
--

DROP TABLE IF EXISTS lm_company_log_type CASCADE;

CREATE TABLE lm_company_log_type (
    id SERIAL,
    name TEXT NOT NULL,

    CONSTRAINT lm_company_log_type_pkey PRIMARY KEY(id)
);

INSERT INTO
    lm_company_log_type(name)
VALUES
    ('Company added'),
    ('Company information changed'),
    ('New role added'),
    ('Basic role added'),
    ('Role changed'),
    ('Role removed'),
    ('Employee added'),
    ('Employee information changed'),
    ('Employee removed from company'),
    ('Employee information changed');
    -- ('Team created'),
    -- ('Team information changed'),
    -- ('Team removed');
--
--

DROP TABLE IF EXISTS lm_company_history CASCADE;

CREATE TABLE lm_company_history (
    id SERIAL,
    company_id INTEGER NOT NULL,
    old_value_id INTEGER,
    name VARCHAR(20) NOT NULL,

    CONSTRAINT lm_company_history_pkey PRIMARY KEY(id),
    CONSTRAINT lm_company_history_company_fkey FOREIGN KEY(company_id) REFERENCES lm_company(id),
    CONSTRAINT lm_company_history_old_value_fkey FOREIGN KEY(old_value_id) REFERENCES lm_company_history(id)
);

--
--

DROP TABLE IF EXISTS lm_user_history CASCADE;

CREATE TABLE lm_user_history (
    id SERIAL,
    user_id INTEGER NOT NULL,
    old_value_id INTEGER,
    first_name VARCHAR(20) NOT NULL,
    second_name VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    phone VARCHAR(20),

    CONSTRAINT lm_user_history_pkey PRIMARY KEY(id),
    CONSTRAINT lm_user_history_user_fkey FOREIGN KEY(user_id) REFERENCES lm_user(id),
    CONSTRAINT lm_user_history_old_value_fkey FOREIGN KEY(old_value_id) REFERENCES lm_user_history(id)
);

--
--

DROP TABLE IF EXISTS lm_role_history CASCADE;

CREATE TABLE lm_role_history (
    id SERIAL,
    role_id INTEGER NOT NULL,
    old_value_id INTEGER,
    name TEXT NOT NULL,

    CONSTRAINT lm_role_history_pkey PRIMARY KEY(id),
    CONSTRAINT lm_role_history_role_fkey FOREIGN KEY(role_id) REFERENCES lm_role(id),
    CONSTRAINT lm_role_history_old_value_fkey FOREIGN KEY(old_value_id) REFERENCES lm_role_history(id)
);

--
--

DROP TABLE IF EXISTS lm_role_history_company_permission_join CASCADE;

CREATE TABLE lm_role_history_company_permission_join (
    history_id INTEGER NOT NULL,
    permission_id INTEGER NOT NULL,

    CONSTRAINT lm_role_history_company_permission_join_history_fkey FOREIGN KEY(history_id) references lm_role_history(id),
    CONSTRAINT lm_role_history_company_permission_join_permission_fkey FOREIGN KEY(permission_id) references lm_company_permission(id)
);

--
--

DROP TABLE IF EXISTS lm_company_log CASCADE;

CREATE TABLE lm_company_log (
    id SERIAL,
    type_id INTEGER NOT NULL,
    reporter_id INTEGER NOT NULL,
    company_history_id INTEGER,
    user_history_id INTEGER,
    role_history_id INTEGER,

    CONSTRAINT lm_company_log_pkey PRIMARY KEY(id),
    CONSTRAINT lm_company_log_new_company_fkey FOREIGN KEY(company_history_id) REFERENCES lm_company_history(id),
    CONSTRAINT lm_company_log_new_user_fkey FOREIGN KEY(user_history_id) REFERENCES lm_user_history(id),
    CONSTRAINT lm_company_log_new_role_fkey FOREIGN KEY(role_history_id) REFERENCES lm_role_history(id)
);