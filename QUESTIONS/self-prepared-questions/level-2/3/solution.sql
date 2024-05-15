INSERT INTO movies (title, year)
    VALUES ('New Release', 2023);

INSERT INTO ratings (movie_id, rating, votes)
    VALUES ((
        SELECT id
        FROM movies
        WHERE title = 'New Release' AND year = 2023
    ), 8.5, 1);

DELETE FROM movies 
    WHERE title = 'New Release' AND year = 2023;

DELETE FROM ratings
    WHERE movie_id = (
        SELECT id
        FROM movies
        WHERE title = 'New Release' AND year = 2023
    );