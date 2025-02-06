import Landing from "../../components/Landing"
import Movies from "../../components/Movies"

export default function Home() {
  return (
    <>
      <Landing />
      <Movies length={3} />
    </>
  )
}
