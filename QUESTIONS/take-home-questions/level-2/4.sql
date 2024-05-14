--Count all the times that Martin Scorsese directed

SELECT COUNT(title) FROM movies
    JOIN directors ON movies.id = directors.movie_id
    JOIN people ON directors.person_id = people.id
    WHERE people.name = 'Martin Scorsese';