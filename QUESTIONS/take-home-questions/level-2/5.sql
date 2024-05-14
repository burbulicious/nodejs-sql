--List star names and the number of movies they have appeared in (acted). 
--List only the stars that have appeared in at least 300 movies.

SELECT people.name, COUNT(*) FROM stars
    JOIN people ON people.id = stars.person_id 
    GROUP BY people.name
    HAVING COUNT(*) >= 300
    ORDER BY COUNT(*);