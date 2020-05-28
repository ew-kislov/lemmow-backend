TRUNCATE lm_user CASCADE;
TRUNCATE lm_company CASCADE;

--

INSERT INTO
    lm_user(first_name, second_name, email, password)
VALUES
    ('Evgeniy', 'Kislov', 'evgeniykislov12@gmail.com', 'root');

--

INSERT INTO
    lm_company(name, owner_id)
VALUES
    ('Lemmow', 1);

--

INSERT INTO
    lm_user(first_name, second_name, email, password, company_id)
VALUES
    ('Rafik', 'Avetisyan', 'rakek@gmail.com', '475yn54h847h', 1),
    ('Ivan', 'Ivanov', 'ivan@gmail.com', '7hf784h', 1),
    ('Michael', 'Jackson', 'nigger@gmail.com', 'g58ghj845hg', 1);
