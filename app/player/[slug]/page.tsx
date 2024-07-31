export default function Page({ params }: { params: { slug: string } }) {
  return (
    <iframe src={`https://vidsrc.me/embed/movie/${params.slug}`} allowFullScreen referrerPolicy="origin" className="h-screen w-screen"></iframe>
  )
}