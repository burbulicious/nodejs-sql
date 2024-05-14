--Count all movie titles released between 2005 and 2015.
SELECT COUNT(title) FROM movies
    WHERE year >= 2005 AND year <= 2015;