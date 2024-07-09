"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Movie } from "./types"
import MovieCard from "@/components/MovieCard"

export default function Home() {
  const [movies, setMovies] = useState<Movie[] | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("https://vidsrc.xyz/movies/latest/page-1.json")
        const json = await res.json()

        const movieData = await Promise.all(
          json.result.map(async (movie: Movie) => {
            const omdbRes = await fetch(`http://www.omdbapi.com/?i=${movie.imdb_id}&apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}`)
            const omdbData = await omdbRes.json()
            return {
              ...movie,
              image_url: omdbData.Poster || null,
              year: omdbData.Year
            }
          })
        )

        setMovies(movieData)
      }
      catch (err) {
        setErr("failed to fetch movies")
      }
    }

    fetchMovies()
  }, [])

  return (
    <main className="flex flex-col items-center p-4 mt-20 md:mt-16">
      <div className="flex flex-wrap gap-2 justify-center">
        {movies && movies.map((movie) => (
          <MovieCard imdb_id={movie.imdb_id} image_url={movie.image_url} year={movie.year} title={movie.title} />
        ))}
      </div>
    </main>
  )
}
