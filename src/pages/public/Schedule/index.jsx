import { useEffect, useState } from "react";
import { getMovies } from "../../../services/movies";
import { getSchedules } from "../../../services/schedules";
import { getStudios } from "../../../services/studios";
import { useParams } from "react-router-dom";

export default function MovieSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [movies, setMovies] = useState([]);
  const [studios, setStudios] = useState([]);
  const { id } = useParams();

  function formatDateString(dateString) {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    const fetchSchedules = async () => {
      try {
        const data = await getSchedules();
        const filteredSchedules = data.filter(
          (schedule) => schedule.movie_id === Number(id)
        );
        setSchedules(filteredSchedules);
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
      }
    };

    const fetchStudios = async () => {
      try {
        const data = await getStudios();
        setStudios(data);
      } catch (error) {
        console.error("Failed to fetch studios:", error);
      }
    };

    fetchMovies();
    fetchSchedules();
    fetchStudios();
  }, [id]);

  const getMovieData = (movieId) => {
    const movie = movies.find((m) => m.id === movieId);
    return movie
      ? {
          title: movie.title,
          poster: movie.poster,
          duration: movie.duration,
          price: movie.price,
        }
      : {
          title: "Unknown Movie",
          poster: "",
          duration: "",
          price: "",
        };
  };

  const getStudioData = (studioId) => {
    const studio = studios.find((s) => s.id === studioId);
    return studio
      ? {
          name: studio.name,
        }
      : {
          name: "Unknown Studio",
        };
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-md overflow-hidden">
        {schedules.length > 0 ? (
          schedules.map((schedule) => {
            const movieData = getMovieData(schedule.movie_id);
            const studioData = getStudioData(schedule.studio_id);

            return (
              <div key={schedule.id} className="flex flex-col md:flex-row p-4">
                {/* Poster Section */}
                <div className="w-full md:w-1/3 p-4">
                  <img
                    src={`http://127.0.0.1:8000/storage/movies/${movieData.poster}`}
                    alt={movieData.title}
                    className="w-full rounded-md shadow-md"
                  />
                </div>

                {/* Movie Info Section */}
                <div className="w-full md:w-2/3 p-4">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {movieData.title}
                  </h1>
                  <p className="text-sm text-gray-600 mb-2">
                    {movieData.duration} Minutes
                  </p>

                  {/* Studio and Date */}
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                      {studioData.name}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                      {formatDateString(schedule.showdate_start)} -{" "}
                      {formatDateString(schedule.showdate_end)}
                    </p>

                    {/* Showtime Section */}
                    {schedule.showtime && schedule.showtime.length > 0 ? (
                      <div className="flex gap-2 flex-wrap">
                        {schedule.showtime.map((time, index) => (
                          <button
                            key={`${schedule.id}-${index}`}
                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition text-gray-800"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No showtimes available
                      </p>
                    )}
                  </div>

                  {/* Price Section */}
                  <p className="text-sm text-gray-600 mt-2">
                    Rp. {movieData.price}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-600 py-6">
            No schedules available.
          </p>
        )}
      </div>
    </div>
  );
}
