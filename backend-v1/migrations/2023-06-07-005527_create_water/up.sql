-- Your SQL goes here
CREATE TABLE water (
    user_id INT NOT NULL,
    date DATE NOT NULL,
    amount INT NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, date)
);