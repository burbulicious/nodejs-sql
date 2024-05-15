SELECT movies.title AS movie_title, 
        movies.year,
        people.name AS director_name,
        star_names.star_name
FROM movies
INNER JOIN directors ON movies.id = directors.movie_id
INNER JOIN people ON directors.person_id = people.id
INNER JOIN (
    SELECT movie_id, GROUP_CONCAT(name, ', ') AS star_name
    FROM (
        SELECT movie_id, name
        FROM stars s
        INNER JOIN people ON s.person_id = people.id
    ) AS star_names
    GROUP BY movie_id
) AS star_names ON movies.id = star_names.movie_id
ORDER BY movies.year DESC
LIMIT 10;
