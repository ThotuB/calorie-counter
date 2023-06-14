-- Your SQL goes here
-- favorite foods with a composite primary key
CREATE TABLE favorite_foods (
    user_id INTEGER NOT NULL,
    food_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, food_id)
);