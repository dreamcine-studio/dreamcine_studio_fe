import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../../services/movies";
import { getGenres } from "../../services/genre";
import { publicStorage } from "../../api";
import { getSchedules } from "../../services/schedules";

export default function MovieList({ length }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [schedulesData, moviesData, genresData] = await Promise.all([
          getSchedules(),
          getMovies(),
          getGenres(),
        ]);

        const movieIdsWithSchedule = new Set(
          schedulesData.map((schedule) => schedule.movie_id)
        );

        // Filter hanya film yang memiliki jadwal tayang
        const filteredMovies = moviesData
          .filter((movie) => movieIdsWithSchedule.has(movie.id))
          .map(({ id, title, poster, genre, genre_id }) => ({
            id,
            title,
            poster,
            genre: genre ||
              genresData.find((g) => g.id === genre_id) || {
                name: "Unknown Genre",
              }, // Simpan genre di dalam movie
          }));

        // Filter hanya name untuk genres
        const filteredGenres = genresData.map(({ name }) => ({ name }));

        setSchedules(schedulesData);
        setMovies(filteredMovies);
        setGenres(filteredGenres);
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
        <div className="flex items-center space-x-4 mt-24">
          <div
            className="w-16 h-16 border-4 border-solid border-transparent rounded-full
            animate-spin
            border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-pink-500"
          ></div>
          {/* Teks dengan Efek Bounce */}
          <div className="text-2xl font-bold text-gray-800 animate-bounce">
            Please Wait ..
          </div>
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

  const getDisplayMovies = () => {
    if (length === "all") {
      return movies;
    } else if (!isNaN(length) && Number(length) > 0) {
      return shuffleArray(movies).slice(0, Number(length));
    }
    return movies;
  };

  const displayedMovies = getDisplayMovies();

  return (
    <div className="flex justify-center flex-wrap gap-4 py-16 dark:bg-gray-900">
      {displayedMovies.map((movie, index) => (
        <div
          key={index}
          className="max-w-sm m-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transform transition-all duration-300 ease-in-out hover:scale-105 hover:translate-y-[-10px] hover:shadow-2xl hover:opacity-90 flex flex-col flex-wrap"
        >
          <Link to={`/movies/${movie.id}`} className="flex flex-col">
            <div className="relative w-[220px] h-[300px] overflow-hidden mx-auto object-cover">
              <img
                className="w-full h-full object-cover rounded-t-lg transition-all duration-300 ease-in-out hover:opacity-80"
                src={publicStorage + movie.poster}
                alt={movie.title}
              />
            </div>

            <div className="p-5 flex flex-col flex-grow w-[220px]">
              <p className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-200 w-full text-wrap break-words whitespace-normal">
                {movie.title}
              </p>
              <p className="mb-4 text-base font-normal text-gray-700 dark:text-gray-400 overflow-hidden break-words line-clamp-1">
                {movie.genre?.name || "Unknown Genre"}
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
