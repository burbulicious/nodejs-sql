SELECT year, ROUND(AVG(rating), 2) from movies
    JOIN ratings ON movie_id = movies.id
    WHERE year >=2010
    AND year <= 2020
    GROUP BY year
    ORDER BY year;