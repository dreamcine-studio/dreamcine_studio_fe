import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../../services/movies";
import { getGenres } from "../../services/genre";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [moviesData, genresData] = await Promise.all([
          getMovies(),
          getGenres(),
        ]);
        setMovies(moviesData);
        setGenres(genresData);
      } catch (err) {
        setError("Failed to fetch data, please try again later");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="py-6 px-12 space-y-2 bg-white-300 min-h-screen w-full flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 border-4 border-t-4 border-transparent border-b-transparent border-l-transparent rounded-full animate-spin border-t-purple-500 border-r-transparent border-b-pink-500 border-l-transparent"></div>
          <div className="text-2xl font-bold text-gray-800">Please Wait ..</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="py-6 px-12 space-y-2 bg-gray-100 min-h-screen w-full flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-500"> {error} </div>
      </main>
    );
  }

  const getGenreName = (id) => {
    const genre = genres.find((g) => g.id === id);
    return genre ? genre.name : "Unknown Genre";
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const randomMovies = shuffleArray(movies).slice(0, 3);

  return (
    <div className="flex justify-center flex-wrap gap-4 py-16 dark:bg-gray-900">
      {randomMovies.map((movie, index) => (
        <div
          key={index}
          className="max-w-sm m-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transform transition-all duration-300 ease-in-out hover:scale-105 hover:translate-y-[-10px] hover:shadow-2xl hover:opacity-90 flex flex-col flex-wrap"
        >
          <Link to={`/movies/${movie.id}`} className="flex flex-col">
          <div className="relative w-[220px] h-[300px] overflow-hidden mx-auto object-cover">
  <img
    className="w-full h-full object-cover rounded-t-lg transition-all duration-300 ease-in-out hover:opacity-80"
    src={`http://127.0.0.1:8000/storage/movies/${movie.poster}`}
    alt={movie.title}
  />
</div>

<div className="p-5 flex flex-col flex-grow w-[220px]">
  <p className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-200 w-full text-wrap break-words whitespace-normal">
    {movie.title}
  </p>
  <p className="mb-4 text-base font-normal text-gray-700 dark:text-gray-400 overflow-hidden break-words line-clamp-1">
    {getGenreName(movie.genre_id)}
  </p>
  <div className="mt-auto">
    <Link
      to={`/movies/${movie.id}`}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Detail
      <svg
        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </Link>
  </div>
</div>

          </Link>
        </div>
      ))}
    </div>
  );
}