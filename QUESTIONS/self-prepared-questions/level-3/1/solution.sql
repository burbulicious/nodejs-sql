SELECT title, people.name
    FROM movies
    JOIN directors ON movies.id = directors.movie_id
    JOIN people ON directors.person_id = people.id
    WHERE directors.person_id IN (
        SELECT DISTINCT person_id
        FROM directors
        INTERSECT
        SELECT DISTINCT person_id
        FROM stars
    ) 
    ORDER BY movies.year DESC
    LIMIT 10;