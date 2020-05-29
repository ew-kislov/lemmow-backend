TRUNCATE lm_user CASCADE;
TRUNCATE lm_company CASCADE;

--

INSERT INTO
    lm_user(first_name, second_name, email, password)
VALUES
    ('Evgeniy', 'Kislov', 'evgeniykislov12@gmail.com', crypt('root', gen_salt('bf')));

--

INSERT INTO
    lm_company(name, owner_id)
VALUES
    ('Lemmow', 1);

--

INSERT INTO
    lm_user(first_name, second_name, email, password, company_id)
VALUES
    ('Rafik', 'Avetisyan', 'rakek@gmail.com', crypt('rafik', gen_salt('bf')), 1),
    ('Ivan', 'Ivanov', 'ivan@gmail.com', crypt('ivan', gen_salt('bf')), 1),
    ('Michael', 'Jackson', 'nigger@gmail.com', crypt('nigger', gen_salt('bf')), 1);
