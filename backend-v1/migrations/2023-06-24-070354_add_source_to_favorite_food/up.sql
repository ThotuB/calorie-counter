-- Your SQL goes here
ALTER TABLE favorite_foods ADD COLUMN source source NULL;
UPDATE favorite_foods SET source = 'usda';
ALTER TABLE favorite_foods ALTER COLUMN source SET NOT NULL;
ALTER TABLE favorite_foods DROP CONSTRAINT favorite_foods_pkey;
ALTER TABLE favorite_foods ADD CONSTRAINT favorite_foods_pkey PRIMARY KEY (user_id, food_id, source);