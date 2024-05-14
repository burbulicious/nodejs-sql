// Write a Node.js script that reads the local .env file to get a FAVORITE_DIRECTOR variable and access the movie database.
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { config } from 'dotenv'
import database from '../../../../database/database.js'

const getDirector = (): string => {
  const directory = join(fileURLToPath(import.meta.url), '../../../../../')
  config({ path: join(directory, '.env.local') })
  const director: string = process.env.FAVORITE_DIRECTOR as string

  return director
}

const getMoviesByDirector = async (director: string): Promise<string[]> => {
  const directory = join(fileURLToPath(import.meta.url), '../')
  const filePath = join(directory, `./9.sql`)
  const sqlFile = await readFile(filePath, 'utf-8')
  const query = database.prepare(sqlFile)
  const movieTitles = query.all(director) as string[]

  return Promise.resolve(movieTitles)
}
const director: string = getDirector()
const movies: string[] = await getMoviesByDirector(director)
console.log(movies)
console.log(process.argv)
