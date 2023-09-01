-- Your SQL goes here
CREATE TYPE serving_size_unit AS ENUM ('g', 'ml');

CREATE TABLE food (
    id SERIAL PRIMARY KEY,
    user_id CHAR(32) NOT NULL,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(100),
    barcode BIGINT,
    calories REAL NOT NULL,
    carbs REAL NOT NULL,
    protein REAL NOT NULL,
    fat REAL NOT NULL,
    serving_size REAL NOT NULL,
    serving_size_unit serving_size_unit NOT NULL,
    ingredients TEXT
)