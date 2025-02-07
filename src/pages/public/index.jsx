import Landing from "../../components/Landing"
import MovieList from "../../components/MovieList"

export default function Home() {
  return (
    <>
      <Landing />
      <MovieList length={4} />
    </>
  )
}
