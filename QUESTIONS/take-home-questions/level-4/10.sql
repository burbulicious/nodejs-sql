--In 2023, Christopher Nolan and Greta Gerwig each released a new movie. 
--These movies already exist in the database, but they have no ratings. Write a single query to add a rating to one of these movies. 
--For these movies, you can assume there is only one movie with the same title and year in the database

INSERT INTO ratings (movie_id, rating, votes)
    SELECT movies.id,9.0,1 FROM movies 
        JOIN directors ON directors.movie_id = movies.id
        JOIN people ON directors.person_id = people.id
        WHERE movies.year = 2023
        AND people.name IN ('Christopher Nolan', 'Greta Gerwig');
     
--checking if the insert ran succesfully 
SELECT title, rating, votes FROM movies
    JOIN ratings ON ratings.movie_id = movies.id
    WHERE movies.id IN (
        SELECT movies.id FROM movies
        JOIN directors ON directors.movie_id = movies.id
        JOIN people ON directors.person_id = people.id
        WHERE movies.year = 2023
        AND people.name IN ('Christopher Nolan', 'Greta Gerwig')
    );