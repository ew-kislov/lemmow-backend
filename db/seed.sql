TRUNCATE lm_user CASCADE;

INSERT INTO
    lm_user(first_name, second_name, email, password, registration_date, login_time, logout_time)
VALUES
    ('first_name_1', 'second_name_1', 'email_1', '123456', current_timestamp, current_timestamp, current_timestamp),
    ('first_name_2', 'second_name_2', 'email_2', '123456', current_timestamp, current_timestamp, current_timestamp),
    ('first_name_3', 'second_name_3', 'email_3', '123456', current_timestamp, current_timestamp, current_timestamp);
