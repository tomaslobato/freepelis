export default function Header() {
    return (
        <header className="flex lg:flex-row flex-col fixed w-screen top-0 left-0 h-16 bg-black items-center py-4 md:pr-10 md:pl-4 justify-between">
            <a href="https://github.com/tomaslobato/freepelis"className="text-2xl font-bold"><span className="text-red-500">Free</span>Pelis</a>
            <input placeholder="search" className="bg-neutral-900 px-2 py-1 rounded-lg"/>
        </header>
    )
}