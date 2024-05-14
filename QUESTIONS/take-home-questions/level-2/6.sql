--List all the movies directed by Frank Darabont and their release years. 
--Order the results by the movie's release year in descending order.

SELECT title, year FROM movies
    JOIN directors ON movies.id = directors.movie_id
    JOIN people ON directors.person_id = people.id
    WHERE people.name = 'Frank Darabont'
    ORDER BY movies.year DESC;