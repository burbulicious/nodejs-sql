import database from '../../../../database/database.js'

const movieTitle: string = process.argv[2]
const year = parseInt(process.argv[3], 10)

const movieExists = (title: string, releaseYear: number): boolean => {
  const query = database.prepare('SELECT * FROM movies WHERE title = ? AND year = ? ')
  const result = query.all(title, releaseYear)
  if (result.length > 0) {
    return true
  }
  return false
}

const addNewMovie = (title: string, releaseYear: number): void => {
  const transation = database.transaction(() => {
    const insertMovieStmt = database.prepare('INSERT INTO movies (title, year) VALUES (?, ?)')
    const insertRatingStmt = database.prepare(
      'INSERT INTO ratings (movie_id, rating, votes) VALUES (?, NULL, 0)'
    )
    const rollbackStmt = database.prepare('ROLLBACK')
    try {
      const movieResult = insertMovieStmt.run(title, releaseYear)
      const movieId = movieResult.lastInsertRowid
      insertRatingStmt.run(movieId)
      console.log('New movie added. Movie ID:', movieId)
    } catch (error: any) {
      rollbackStmt.run()
      console.error('Error adding new movie:', error.message)
      process.exit(1)
    }
  })
  transation()
  database.close()
}

if (!movieTitle || !year) {
  console.error('Please provide both movie title and year as command-line arguments.')
  process.exit(1)
} else if (movieExists(movieTitle, year)) {
  console.error('Movie already exists in the database')
  process.exit(1)
} else {
  addNewMovie(movieTitle, year)
}
