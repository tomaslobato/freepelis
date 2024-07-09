import { Movie } from "@/app/types"
import Link from "next/link"

export default function MovieCard({ imdb_id, year, image_url, title }: Movie) {
    return (
        <Link href={`player/${imdb_id}`} className="w-48 md:w-56 h-72 md:h-80 p-2 rounded-xl border-neutral-800 border-2 flex flex-col justify-center gap-1">
            <div className="bg-neutral-500 w-full h-5/6 rounded-xl flex items-center justify-center">
                <img src={image_url} alt="movie image" className="w-full h-full object-cover rounded-xl" />
            </div>
            <h3>{title}</h3>
        </Link>
    )
}