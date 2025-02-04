import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../../services/movies";
import { getGenres } from "../../services/genre";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  // ini untuk mengambil data dari api
  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovies();
      setMovies(data);
    };
    const fetchGenre = async () => {
      const data = await getGenres();
      setGenres(data);
    };

    fetchMovie();
    fetchGenre();
  }, []);

  const getGenreName = (id) => {
    const genre = genres.find((g) => g.id === id);
    return genre ? genre.name : "Unknown Genre";
  };

  // Fungsi untuk mengacak array
  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
  };

  // Ambil 3 gambar secara acak
  const randomMovies = shuffleArray(movies).slice(0, 3);

  return (
 
    <div className="flex justify-center flex-wrap gap-4">
  {randomMovies.map((movie, index) => (
    <div
      key={index}
      className="max-w-sm w-full sm:max-w-xs md:max-w-sm lg:max-w-md bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transform transition-all duration-300 ease-in-out hover:scale-105 hover:translate-y-[-10px] hover:shadow-2xl hover:opacity-90"
    >
      <Link to={`/movies/${movie.id}`}>
        {/* Kontainer gambar dengan rasio lebih tinggi */}
        <div className="relative w-full" style={{ paddingTop: '80%' }}> {/* Meningkatkan rasio menjadi 80% */}
          <img
            className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg transition-all duration-300 ease-in-out hover:opacity-80"
            src={`http://127.0.0.1:8000/storage/movies/${movie.poster}`}
            alt={movie.title}
          />
        </div>

        <div className="p-5">
          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title}</p>
          <a href="#">
            <h5 className="mb-4 font-normal text-gray-700 dark:text-gray-400">
              {getGenreName(movie.genre_id)}
            </h5>
          </a>

          <a
            to="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Detail
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>
      </Link>
    </div>
  ))}
</div>

  );
}