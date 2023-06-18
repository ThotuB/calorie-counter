-- Your SQL goes here
CREATE TABLE favorite_foods (
    user_id VARCHAR(32) NOT NULL,
    food_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, food_id)
);