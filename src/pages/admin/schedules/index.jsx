import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovies } from "../../../services/movies";
import { getSchedules } from "../../../services/schedules";
import { getStudios } from "../../../services/studios";

export default function Schedules() {
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
    return movie
      ? {
          title: movie.title,
          poster: movie.poster,
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

  console.log("tes", schedules)
  return (
    <>
      <div className="w-full">
        <div className="datatable-container">
          <Link
            to={`/admin/schedules/create`}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            <i className="fa-solid fa-plus mr-2"></i>
            Add Data
          </Link>

          <table className="table w-full table-auto datatable-table mt-4">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="py-4 px-2">
                  <div className="flex items-center gap-1.5">
                    <p>Photo</p>
                  </div>
                </th>
                <th className="py-4 px-2">
                  <div className="flex items-center gap-1.5">
                    <p>Title</p>
                  </div>
                </th>
                <th className="py-4 px-2">
                  <div className="flex items-center gap-1.5">
                    <p>Studio</p>
                  </div>
                </th>
                <th className="py-4 px-2">
                  <div className="flex items-center gap-1.5">
                    <p>Showtime</p>
                  </div>
                </th>
                <th className="py-4 px-2">
                  <div className="flex items-center gap-1.5">
                    <p>Showdate</p>
                  </div>
                </th>
                <th className="py-4 px-2">
                  <div className="flex items-center gap-1.5">
                    <p>Controls</p>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {schedules.map((schedule, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="py-2">
                    <img
                      src={getMovieData(schedule.movie_id).poster}
                      alt={getMovieData(schedule.movie_id).title}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-2">
                    {getMovieData(schedule.movie_id).title}
                  </td>
                  <td className="py-2">
                    {getStudioData(schedule.studio_id).name}
                  </td>
                  <td className="py-2">
                    <div className="flex flex-wrap gap-2">
                      {" "}
                      {schedule.showtime && schedule.showtime.length > 0 ? (
                        schedule.showtime.map((time, timeIndex) => (
                          <div
                            key={`${schedule.id}-${timeIndex}`}
                            className="bg-gray-200 text-gray-800 py-2 px-4 rounded"
                          >
                            {time}
                          </div>
                        ))
                      ) : (
                        <div>No showtimes available</div>
                      )}
                    </div>
                  </td>
                  <td className="py-2">
                    <div>{schedule.showdate_start} - {schedule.showdate_end}
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="flex items-center gap-4 mx-2">
                      <Link to={`/admin/schedules/edit/${schedule.id}`}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button>
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
