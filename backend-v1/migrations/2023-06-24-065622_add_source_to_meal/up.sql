-- Your SQL goes here
ALTER TABLE meals ADD COLUMN source source NULL;
UPDATE meals SET source = 'usda';
ALTER TABLE meals ALTER COLUMN source SET NOT NULL;