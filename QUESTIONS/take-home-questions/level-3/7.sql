--Write a query that lists all movie titles where Scarlett Johansson and Chris Evans starred together

SELECT title FROM movies 
    JOIN stars s1 ON movies.id = s1.movie_id
    JOIN stars s2 ON movies.id = s2.movie_id
    WHERE s1.person_id = (
        SELECT id FROM people 
            WHERE name = 'Scarlett Johansson'
    ) 
    AND s2.person_id = (
        SELECT id FROM people
            WHERE name = 'Chris Evans'
    );