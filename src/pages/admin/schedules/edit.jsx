import { useEffect, useState } from "react";
import { getMovies } from "../../../services/movies";
import { getStudios } from "../../../services/studios";
import { useNavigate, useParams } from "react-router-dom";
import { getSchedules, updateSchedules } from "../../../services/schedules";

export default function ScheduleEdit() {
  const [movies, setMovies] = useState([]);
  const [studios, setStudios] = useState([]);
  const [scheduleData, setScheduleData] = useState({
    movie_id: "",
    studio_id: "",
    showdate_start: "",
    showdate_end: "",
  });
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await getSchedules();
        const schedule = data.find((schedule) => schedule.id === parseInt(id));
        if (schedule) {
          setScheduleData({
            movie_id: schedule.movie_id,
            studio_id: schedule.studio_id,
            showdate_start: schedule.showdate_start,
            showdate_end: schedule.showdate_end,
          });
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    const fetchMovies = async () => {
      try {
        setMovies(await getMovies());
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchStudios = async () => {
      try {
        setStudios(await getStudios());
      } catch (error) {
        console.error("Error fetching studios:", error);
      }
    };

    fetchSchedules();
    fetchMovies();
    fetchStudios();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleData({ ...scheduleData, [name]: value });
  };

  const updateSchedule = async (e) => {
    e.preventDefault();

    try {
      await updateSchedules(id, scheduleData);
      navigate("/admin/schedules");
    } catch (error) {
      console.error("Error updating schedule:", error);
      if (error.response) {
        setErrors(
          typeof error.response.data.message === "object"
            ? Object.values(error.response.data.message).flat().join(", ")
            : error.response.data.message
        );
      }
    }
  };

  return (
    <section className="min-h-screen">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="border-b mb-4 text-xl font-bold text-gray-900 dark:text-white uppercase py-4">
          Edit Schedule
        </h2>
        {errors && <div className="text-red-500 mb-4">{errors}</div>}
        <form onSubmit={updateSchedule}>
          <div className="grid gap-4 sm:grid-cols-2 pt-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="mb-3 block text-sm font-bold text-gray-900 dark:text-white">
                Movie
              </label>
              <select
                name="movie_id"
                value={scheduleData.movie_id}
                onChange={handleInputChange}
                className="w-full rounded border border-stroke bg-transparent px-5 py-3 outline-none transition text-black dark:text-gray-200"
              >
                <option value="">--Select Movie--</option>
                {movies.map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-3 block text-sm font-bold text-gray-900 dark:text-white">
                Studio
              </label>
              <select
                name="studio_id"
                value={scheduleData.studio_id}
                onChange={handleInputChange}
                className="w-full rounded border border-stroke bg-transparent px-5 py-3 outline-none transition text-black dark:text-gray-200"
              >
                <option value="">--Select Studio--</option>
                {studios.map((studio) => (
                  <option key={studio.id} value={studio.id}>
                    {studio.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Showdate Start
              </label>
              <input
                type="date"
                name="showdate_start"
                onChange={handleInputChange}
                value={scheduleData.showdate_start}
                className="w-full rounded border border-stroke bg-transparent px-5 py-3 outline-none transition dark:text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Showdate End
              </label>
              <input
                type="date"
                name="showdate_end"
                onChange={handleInputChange}
                value={scheduleData.showdate_end}
                className="w-full rounded border border-stroke bg-transparent px-5 py-3 outline-none transition dark:text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
          >
            Edit Schedule
          </button>
        </form>
      </div>
    </section>
  );
}
