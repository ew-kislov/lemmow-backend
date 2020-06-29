TRUNCATE lm_user CASCADE;
TRUNCATE lm_company CASCADE;

--

INSERT INTO
    lm_user(first_name, second_name, email, password, registration_date)
VALUES
    ('Evgeniy', 'Kislov', 'evgeniykislov12@gmail.com', 'root', '2020-01-01');


INSERT INTO
    lm_company(name, owner_id, creation_date)
VALUES
    ('Lemmow', 1, '2020-01-01');


UPDATE lm_user SET company_id = 1 WHERE id = 1;


INSERT INTO
    lm_user(first_name, second_name, email, password, company_id, registration_date)
VALUES
    ('Rafik', 'Avetisyan', 'rakek@gmail.com', 'rafik', 1, '2020-01-01'),
    ('Ivan', 'Ivanov', 'ivan@gmail.com', 'ivan', 1, '2020-01-01'),
    ('Michael', 'Jackson', 'nigger@gmail.com', 'nigger', 1, '2020-01-01');
