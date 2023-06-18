-- Your SQL goes here
CREATE TYPE weight_goal AS ENUM ('lose', 'maintain', 'gain');
CREATE TYPE system as ENUM ('metric', 'imperial');
CREATE TYPE water_size as ENUM ('glass', 'bottle');

CREATE TABLE settings (
    user_id VARCHAR(32) PRIMARY KEY,
    weight_goal weight_goal NOT NULL,
    age INTEGER NOT NULL,
    height INTEGER NOT NULL,
    weight INTEGER NOT NULL,
    system system NOT NULL,
    water_goal INTEGER NOT NULL DEFAULT 2,
    water_size water_size NOT NULL DEFAULT 'glass'
);