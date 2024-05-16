import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import database from '../../../../../database/database.js'

const getSqlQuery = async (fileName: string) => {
  const directory = join(fileURLToPath(import.meta.url), '../../queries')
  const filePath = join(directory, `./${fileName}`)
  const sqlFile = await readFile(filePath, 'utf-8')
  const query = database.prepare(sqlFile)
  return query
}

const movieExists = async (movieTitle: string, releaseYear: number): Promise<boolean> => {
  const query = await getSqlQuery('get-movie-id.sql')
  const result = query.all(movieTitle, releaseYear)
  if (result.length > 0) {
    return true
  }
  return false
}

const ratingExists = async (movieId: number): Promise<boolean> => {
  const query = await getSqlQuery('get-rating.sql')
  const result = query.all(movieId)
  if (result.length > 0) {
    return true
  }
  return false
}

const getMovieId = async (movieTitle: string, releaseYear: number): Promise<{ id: number }> => {
  const query = await getSqlQuery('get-movie-id.sql')
  const movieTitles = query.get(movieTitle, releaseYear) as { id: number }
  return Promise.resolve(movieTitles)
}

const addMovieRating = async (movieId: number, rating: number): Promise<void> => {
  const transation = database.transaction(async () => {
    const insertRatingStmt = await getSqlQuery('insert-rating.sql')
    const rollbackStmt = database.prepare('ROLLBACK')

    try {
      insertRatingStmt.run(movieId, rating)
      console.log('New rating added for Movie ID:', movieId)
    } catch (error: any) {
      rollbackStmt.run()
      console.error('Error adding new movie:', error.message)
      process.exit(1)
    }
  })
  transation()
}
export { getMovieId, addMovieRating, movieExists, ratingExists }
