-- Your SQL goes here
CREATE TABLE macro_goals (
    user_id VARCHAR(32) PRIMARY KEY,
    calories INT NOT NULL,
    carbs INT NOT NULL,
    protein INT NOT NULL,
    fat INT NOT NULL,
    percent_carbs REAL NOT NULL DEFAULT 0.5,
    percent_protein REAL NOT NULL DEFAULT 0.3,
    percent_fat REAL NOT NULL DEFAULT 0.2
)