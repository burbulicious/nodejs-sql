--List movie title starting letters and an average rating associated with them. 
--Ignore non-Latin and non-uppercase letters

SELECT UPPER(SUBSTR(title, 1, 1)) AS first_letter, AVG(rating) 
    FROM movies
    JOIN ratings ON movie_id = id
    WHERE title GLOB '[A-Za-z]*'
    GROUP BY first_letter
    ORDER BY first_letter;