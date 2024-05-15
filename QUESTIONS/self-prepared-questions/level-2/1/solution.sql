SELECT name, COUNT(*) FROM people
    JOIN directors ON person_id = people.id
    JOIN movies ON movies.id = movie_id
    GROUP BY name
    HAVING COUNT(*) >=10
    ORDER BY COUNT(*) DESC