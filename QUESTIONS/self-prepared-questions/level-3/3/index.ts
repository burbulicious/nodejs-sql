import fs from 'fs'
import csv from 'csv-parser'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import database from '../../../../database/database.js'

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS awards (
        id INTEGER PRIMARY KEY,
        award_name TEXT,
        movie_id INTEGER,
        year INTEGER,
        FOREIGN KEY(movie_id) REFERENCES movies(id)
    );
`
database.exec(createTableQuery)

const directory = join(fileURLToPath(import.meta.url), '../')
const csvFilePath = join(directory, `./awards.csv`)

const insertStmt = database.prepare(`
  INSERT INTO awards (award_name, movie_id, year) 
  VALUES (?, (SELECT id FROM movies WHERE title = ?), ?)
`)

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    const existingAward = database
      .prepare('SELECT id FROM awards WHERE award_name = ? AND year = ?')
      .get(row.award, row.year)
    if (!existingAward) {
      insertStmt.run(row.award, row.title, parseInt(row.year, 10))
    }
  })
  .on('end', () => {
    database.close()
  })
