--List all the movies rated above 8.5 that feature a star born after 2005. 
--Order the list by the movie's rating in descending order. 
--You should return the movie title, rating, and the star's name. 
--A movie can have multiple stars, which means that a movie can appear multiple times in the result set.

SELECT title, rating, people.name FROM movies
    JOIN ratings ON movies.id = ratings.movie_id
    JOIN stars ON movies.id = stars.movie_id
    JOIN people ON stars.person_id = people.id
    WHERE people.birth >= 2005 
    AND rating >=8.5 
    ORDER BY rating DESC;