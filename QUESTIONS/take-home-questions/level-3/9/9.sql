--The script should return a list of movies the favorite director directed. The list should be ordered by movie rating in descending order.
SELECT title FROM movies 
    JOIN directors ON directors.movie_id = movies.id
    JOIN people ON directors.person_id = people.id
    JOIN ratings ON ratings.movie_id = movies.id
    WHERE people.name = ?
    ORDER BY rating DESC;