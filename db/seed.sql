TRUNCATE lm_company CASCADE;
TRUNCATE lm_company_history CASCADE;
TRUNCATE lm_company_log CASCADE;
TRUNCATE lm_company_log_type CASCADE;
TRUNCATE lm_role CASCADE;
TRUNCATE lm_role_company_permission_join CASCADE;
TRUNCATE lm_role_history CASCADE;
TRUNCATE lm_role_history_company_permission_join CASCADE;
TRUNCATE lm_user CASCADE;
TRUNCATE lm_user_history CASCADE;

--
--

-- New user registered

INSERT INTO
    lm_user(name, email, password, registration_date)
VALUES
    ('Evgeniy Kislov', 'evgeniykislov12@gmail.com', 'root', '2020-01-01');

-- -- User creates company

-- INSERT INTO
--     lm_company(name, creation_date)
-- VALUES
--     ('Lemmow', '2020-01-01');

-- INSERT INTO
--     lm_role(name, company_id)
-- SELECT
--     name, 1
-- FROM
--     lm_basic_role
-- WHERE
--     id = 1;

-- INSERT INTO
--     lm_role_company_permission_join(role_id, permission_id)
-- SELECT
--     1, permission_id
-- FROM
--     lm_basic_role_company_permission_join
-- WHERE 
--     role_id = 1;

-- UPDATE
--     lm_user
-- SET
--     company_id = 1, role_id = 1
-- WHERE
--     id = 1;

-- -- User adds new roles and permissions

-- INSERT INTO
--     lm_role(name, company_id)
-- VALUES
--     ('Human Resources', 1),
--     ('Project Manager', 1),
--     ('Mobile developer', 1);

-- INSERT INTO
--     lm_role_company_permission_join(role_id, permission_id)
-- VALUES
--     (2, 2), (2, 3), (2, 4), (2, 5), (2, 6),
--     (3, 6), (3, 7), (3, 8), (3, 9),
--     (4, 6), (4, 9), (4, 10);

-- -- User adds new 

-- INSERT INTO
--     lm_user(name, email, password, company_id, registration_date, role_id, invitor_id)
-- VALUES
--     ('Rafik Avetisyan', 'rakek@gmail.com', 'rafik', 1, '2020-01-01', 2, 1),
--     ('Ivan Ivanov', 'ivan@gmail.com', 'ivan', 1, '2020-01-01', 3, 1),
--     ('Michael Jackson', 'nigger@gmail.com', 'nigger', 1, '2020-01-01', 4, 1);
