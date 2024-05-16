import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import database from '../database/database.js'

const getSqlQuery = async (fileName: string) => {
  const directory = join(fileURLToPath(import.meta.url), '../../movies')
  const filePath = join(directory, `./${fileName}`)
  const sqlFile = await readFile(filePath, 'utf-8')
  const query = database.prepare(sqlFile)
  return query
}

const sql1Query = async (): Promise<string[]> => {
  const query = await getSqlQuery('1.sql')
  const movieTitles = query.all() as string[]
  return Promise.resolve(movieTitles)
}
const sql2Query = async (): Promise<number> => {
  const query = await getSqlQuery('2.sql')
  const birthYear = query.get() as number
  return Promise.resolve(birthYear)
}
const sql3Query = async (): Promise<string[]> => {
  const query = await getSqlQuery('3.sql')
  const movieTitles = query.all() as string[]
  return Promise.resolve(movieTitles)
}

const deleteMovie = async (movieTitle: string): Promise<void> => {
  const query = await getSqlQuery('delete-movie.sql')
  query.run(movieTitle)
}

export { sql1Query, sql2Query, sql3Query, getSqlQuery, deleteMovie }
