import { Movie } from "@/app/types"
import Link from "next/link"

export default function MovieCard({ id, year, image_url, title }: Movie) {
    return (
        <Link href={`player/${id}`} className="w-44 md:w-56 h-72 md:h-80 justify-between rounded-xl border-neutral-800 border-2 flex flex-col pb-2 hover:bg-zinc-800 hover:border-zinc-300">
            <div className="bg-neutral-500 w-full h-5/6 rounded-xl flex items-center justify-center">
                <img src={image_url} alt="movie image" className="w-full h-full object-cover rounded-xl" />
            </div>
            <h3 className="px-2">{title}</h3>
        </Link>
    )
}