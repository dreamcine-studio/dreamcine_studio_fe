import { useEffect, useState } from "react";
import { showMovie } from "../../services/movies";
import { getGenres } from "../../services/genre";
import { Link, useParams } from "react-router-dom";

export default function MovieDetail() {
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);
  const { id }  = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await showMovie(id);
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      }
    }

    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    }

    fetchMovie();
    fetchGenres();

  }, [id]);

  const getGenreName = (id) => {
    const genre = genres.find((item) => item.id === id);
    return genre ? genre.name : "Unknown Genre";
  };

  return (

    <div className="w-full p-4 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4 p-4">
            <div className="flex flex-col w-full md:w-1/2 px-4 mb-8 items-center">
            {movie.poster ? (
  <img
    src={movie.poster}
    className="h-96 w-auto rounded-lg shadow-md mx-auto mb-4"
    alt={movie.title}
  />
) : (
  <p className="text-gray-400">Poster not available</p>
)}
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-2 dark:text-white">
                {movie.title}
              </h2>
              <p className="text-gray-600 mb-4">{getGenreName(movie.genre_id)}</p>
              <div>
                <p className="mb-6 dark:text-gray-200">
                  <i className="fa-solid fa-clock mr-2"></i>
                  {movie.duration} minutes
                </p>
              </div>

              <p className="mb-6 dark:text-gray-200">
                {movie.description}
              </p>

              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Cast By:
                </h3>
                <p className="mb-4 dark:text-gray-200">{movie.cast}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Release Date:
                </h3>
                <p className="mb-4 dark:text-gray-200">{movie.release_date}</p>
              </div>

              <div className="flex space-x-4 mb-6">
                <Link to="/schedule" className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <i className="fa-solid fa-ticket"></i>
                  Book Your Ticket Here
                </Link>
                <a
                  
                  className="px-6 py-2 mx-auto border border-black hover:bg-yellow-300 rounded cursor-pointer dark:text-gray-200 text-center dark:border-gray-200 dark:hover:bg-yellow-700"
                  href="https://www.youtube.com/watch?v=6COmYeLsz4c"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Movie Trailer
                </a>
                <button className="flex items-center text-gray-800 px-3 py-2 rounded-md">
                  <i className="fa-solid fa-heart text-pink-500 hover:text-pink-400 dark:text-pink-400 dark:hover:text-pink-500 fa-xl"></i>
                </button>
              </div>
            </div>

            {/* <div className="w-full p-4">
              <h1 className="text-xl mb-4 font-bold font-sans dark:text-gray-100">
                Videos Related To{" "}
                <span className="text-yellow-500 dark:text-yellow-200">
                  {movie.title}
                </span>
              </h1>
              <div className="flex flex-wrap gap-4 md:justify-center">
                <iframe
                  width="280"
                  height="158"
                  src={movie.video1}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>

                <iframe
                  width="280"
                  height="158"
                  src={movie.video2}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>

                <iframe
                  width="280"
                  height="158"
                  src={movie.video3}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>

                <iframe
                  width="280"
                  height="158"
                  src={movie.video4}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
            </div> */}
          </div>
      </div>
    </div>
  );
}

{
  /* star review  */
}
{
  /* <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
            </div> */
}
