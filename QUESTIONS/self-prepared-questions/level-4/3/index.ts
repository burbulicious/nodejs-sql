import { getMovieId, movieExists, ratingExists, addMovieRating } from './queries/index.js'

const movieTitle: string = process.argv[2]
const year: number = parseInt(process.argv[3], 10)
const rating: number = parseFloat(process.argv[4])

let movieId: { id: number } = { id: 0 }
if (await movieExists(movieTitle, year)) {
  movieId = await getMovieId(movieTitle, year)
}
if (!movieTitle || !year) {
  console.error('Please provide both movie title and year as command-line arguments.')
  process.exit(1)
} else if (movieId.id) {
  if (!(await ratingExists(movieId.id))) {
    await addMovieRating(movieId.id, rating)
    console.error('Rating succesfully added to the ratings table')
  } else {
    console.error('Rating for this movie already exists in the database')
    process.exit(1)
  }
} else {
  console.error("Movie doesn't exist in the database")
  process.exit(1)
}
