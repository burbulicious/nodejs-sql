type Movie = {
  id: number
  title: string
  year: number
}
type Person = {
  id: number
  name: string
  birth: number
}
type Star = {
  movie_id: number
  person_id: number
}
type Director = {
  movie_id: number
  person_id: number
}
type Rating = {
  movie_id: number
  rating: number
  votes: number
}

export type { Movie, Person, Star, Director, Rating }
