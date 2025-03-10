import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovies } from "../../../services/movies";
import { deleteSchedules, getSchedules } from "../../../services/schedules";
import { getStudios } from "../../../services/studios";
import { publicStorage } from "../../../api";

export default function AdminSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [movies, setMovies] = useState([]);
  const [studios, setStudios] = useState([]);
  const [Loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [schedulesData, moviesData, studiosData] = await Promise.all([
          getSchedules(),
          getMovies(),
          getStudios(),
        ]);

        setStudios(studiosData);
        setMovies(moviesData);
        setSchedules(schedulesData);
      } catch (error) {
        setError("Failed to fetch data, please try again later : ");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (Loading) {
    return (
      <main className="py-6 px-12 space-y-2 bg-gray-300 min-h-screen w-full flex items-center justify-center">
        {/* Loading Spinner */}
        <div className="flex items-center space-x-4">
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
      <main className="py-l px-12 space-y-2 bg-gray-100 min-h-screen w-full flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-500"> {error} .. </div>
      </main>
    );
  }

  const getMovieData = (id) => {
    const movie = movies.find((m) => m.id === id);
    return movie
      ? {
          title: movie.title,
          poster: publicStorage + movie.poster,
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

  return (
    <>
      <div className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1 min-h-screen">
        <div className="flex items-center gap-6 justify-start">
          <h1 className="text-2xl text-center font-bold dark:text-white">
            Schedules
          </h1>
          <Link
            to={`/admin/schedules/create`}
            className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            <i className="fa-solid fa-plus mr-2"></i>
            Add Data
          </Link>
        </div>

        <div className="max-w-full overflow-x-auto mt-4">
          <table className="w-full table-auto">
            <thead className="border-b bg-gray-50 dark:bg-gray-900 text-white">
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-bold text-gray-700 dark:text-white uppercase">
                  Photo
                </th>
                <th className="py-4 px-4 font-bold text-gray-700 dark:text-white uppercase">
                  Title
                </th>
                <th className="py-4 px-4 font-bold text-gray-700 dark:text-white uppercase">
                  Studio
                </th>
                <th className="py-4 px-4 font-bold text-gray-700 dark:text-white uppercase">
                  Showdate
                </th>
                <th className="py-4 px-4 font-bold text-gray-700 dark:text-white uppercase">
                  Controls
                </th>
              </tr>
            </thead>
            <tbody>
              {schedules.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-red-500 py-4">
                    No schedules found.
                  </td>
                </tr>
              )}
              {schedules.map((schedule, index) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
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
                    <td className="py-4 px-4 text-black dark:text-white">
                      {schedule.showdate_start} - {schedule.showdate_end}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3.5">
                        <Link to={`/admin/schedules/edit/${schedule.id}`}>
                          <i className="fa-solid fa-pen-to-square text-orange-500"></i>
                        </Link>
                        <button onClick={() => handleDelete(schedule.id)}>
                          <i className="fa-solid fa-trash text-red-700 dark:text-red-500"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
