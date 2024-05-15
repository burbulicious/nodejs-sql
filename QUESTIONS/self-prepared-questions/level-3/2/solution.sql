SELECT name FROM people
    WHERE people.id IN (
        SELECT stars.person_id
            FROM stars
            JOIN movies ON stars.movie_id = movies.id
            JOIN directors ON movies.id = directors.movie_id
            JOIN people ON directors.person_id = people.id
            WHERE people.name = 'Quentin Tarantino'
        
        INTERSECT
        
        SELECT stars.person_id
            FROM stars
            JOIN movies ON stars.movie_id = movies.id
            JOIN directors ON movies.id = directors.movie_id
            JOIN people ON directors.person_id = people.id
            WHERE people.name = 'Martin Scorsese'
    );