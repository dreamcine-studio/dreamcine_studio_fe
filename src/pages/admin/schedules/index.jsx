import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovies } from "../../../services/movies";
import { deleteSchedules, getSchedules } from "../../../services/schedules";
import { getStudios } from "../../../services/studios";

export default function AdminSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [movies, setMovies] = useState([]);
  const [studios, setStudios] = useState([]);

  console.log(schedules);
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await getSchedules();
        setSchedules(data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchStudio = async () => {
      try {
        const data = await getStudios();
        setStudios(data);
      } catch (error) {
        console.error("Error fetching studio:", error);
      }
    };

    fetchSchedules();
    fetchMovies();
    fetchStudio();
  }, []);

  const getMovieData = (id) => {
    const movie = movies.find((m) => m.id === id);
    const baseURL = "http://127.0.0.1:8000/storage/movies/";
    return movie
      ? {
          title: movie.title,
          poster: baseURL + movie.poster,
        }
      : {
          title: "Unknown Movie",
          poster: "",
        };
  };

  const getStudioData = (id) => {
    const studio = studios.find((s) => s.id === id);
    return studio
      ? {
          name: studio.name,
        }
      : {
          name: "Unknown Studio",
        };
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this schedule?"
    );

    if (confirmDelete) {
      try {
        await deleteSchedules(id);
        setSchedules(schedules.filter((schedule) => schedule.id !== id));
        alert("Schedule deleted successfully");
      } catch (error) {
        console.error("Error deleting schedule:", error);
        alert("Failed to delete the schedule. Please try again later.");
      }
    }
  };

  console.log("tes", schedules);
  console.log("Movie Data:", movies);

  return (
    <>
      <div className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div>
          <h1 className="text-2xl font-bold mb-4">Schedules</h1>
        </div>
        <Link
          to={`/admin/schedules/create`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <i className="fa-solid fa-plus mr-2"></i>
          Add Data
        </Link>

        <div className="max-w-full overflow-x-auto mt-4">
          <table className="w-full table-auto">
            <thead className="border-b bg-gray-50 text-white">
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white">Photo</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Title</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Studio</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Showtime</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Showdate</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Controls</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => (
                <tr key={index} className="hover:bg-gray-50 border-b border-gray-200">
                  <td className="py-4 px-4">
                    <img
                      src={getMovieData(schedule.movie_id).poster}
                      alt={getMovieData(schedule.movie_id).title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white">
                    {getMovieData(schedule.movie_id).title}
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white">
                    {getStudioData(schedule.studio_id).name}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-2">
                      {schedule.showtime && schedule.showtime.length > 0 ? (
                        schedule.showtime.map((time, timeIndex) => (
                          <div
                            key={`${schedule.id}-${timeIndex}`}
                            className="bg-gray-200 text-gray-800 py-1 px-3 rounded-lg text-sm"
                          >
                            {time}
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500">No showtimes available</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white">
                    {schedule.showdate_start} - {schedule.showdate_end}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3.5">
                      <Link to={`/admin/schedules/edit/${schedule.id}`}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button onClick={() => handleDelete(schedule.id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
