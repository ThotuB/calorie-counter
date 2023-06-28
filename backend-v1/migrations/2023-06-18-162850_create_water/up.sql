-- Your SQL goes here
DROP TABLE water;

CREATE TABLE water (
    user_id VARCHAR(32) NOT NULL,
    date DATE NOT NULL,
    amount INT NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, date)
);