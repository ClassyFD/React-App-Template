UPDATE users 
SET memes = $8
WHERE id = $7;
INSERT INTO memes (picture, likes, comments, tags, caption, meme_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7);
SELECT memes.*, users.memes, users.username, users.id AS user_table_id
FROM memes 
JOIN users ON users.id = memes.user_id
WHERE meme_id = $6;

