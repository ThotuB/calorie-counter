-- Your SQL goes here
CREATE TYPE meal_type AS ENUM ('breakfast', 'lunch', 'dinner', 'snack');
CREATE TYPE portion_size AS ENUM ('serving', 'gram', 'ml');

CREATE TABLE meals (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(32) NOT NULL,
    food_id INTEGER NOT NULL,
    meal_type meal_type NOT NULL,
    date DATE NOT NULL,
    portions REAL NOT NULL,
    portion_size portion_size NOT NULL
);