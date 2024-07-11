"use client"

import { useEffect, useState } from "react"
import { Movie, TMDBMovie } from "./types"
import MovieCard from "@/components/MovieCard"
import Link from "next/link"
import { Loader2, Search } from "lucide-react"

const getMovies = async (searchQuery: string | null): Promise<Movie[]> => {
  try {
    const url = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=es-MX&query=${encodeURIComponent(searchQuery)}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=es-MX`

    const res = await fetch(url)
    const json = await res.json()
    console.log(json)

    return json.results.map((movie: TMDBMovie) => ({
      id: movie.id,
      title: movie.title,
      image_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      year: movie.release_date.split('-')[0]
    }))
  } catch (err) {
    console.error("Failed to fetch movies:", err)
    throw new Error("Failed to fetch movies")
  }
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovies(null)
        setMovies(data)
      } catch (err) {
        setError("Hubo un error al cargar las películas")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getMovies(searchQuery)
      setMovies(data)
    } catch (err) {
      setError("Hubo un error al buscar las películas")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center py-4 md:p-4">
      <header className="flex flex-col items-center pb-6 gap-3">
        <Link href="/" className="text-3xl font-bold"><span className="text-red-500">Free</span>Pelis</Link>
        <div className="flex gap-2">
          <input
            placeholder="Buscar"
            className="bg-neutral-900 px-2 py-1 rounded-lg"
            value={searchQuery}
            onChange={ev => setSearchQuery(ev.target.value)}
          />
          <button onClick={handleSearch} className="bg-red-600 text-white p-1 flex justify-center items-center border-red-600 border rounded-lg"><Search /></button>
        </div>
      </header>
      {isLoading ? (
        <Loader2 className="animate-spin w-10 h-10" />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="flex flex-wrap gap-2 justify-center">
          {movies && movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              image_url={movie.image_url}
              year={movie.year}
              title={movie.title}
            />
          ))}
        </div>
      )}
    </main>
  )
}