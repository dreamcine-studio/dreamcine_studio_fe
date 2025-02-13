import { useEffect, useState } from "react";
import { getSchedules } from "../../../services/schedules";
import { getMovies } from "../../../services/movies";
import { getStudios } from "../../../services/studios";
import { getShowtimes } from "../../../services/showtime";
import { createScheduleShowtimes } from "../../../services/scheduleshowtime";
import { useNavigate } from "react-router-dom";
import Error from "../../../components/Error";

export default function ScheduleShowtimeCreate() {
  const [errors, setErrors] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [movies, setMovies] = useState([]);
  const [studios, setStudios] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schedulesData = await getSchedules();
        const moviesData = await getMovies();
        const studiosData = await getStudios();
        const showtimesData = await getShowtimes();

        // Mapping untuk mendapatkan movie title dan studio name
        const enhancedSchedules = schedulesData.map((schedule) => ({
          ...schedule,
          movie:
            moviesData.find((movie) => movie.id === schedule.movie_id) || {},
          studio:
            studiosData.find((studio) => studio.id === schedule.studio_id) ||
            {},
        }));

        setSchedules(enhancedSchedules);
        setMovies(moviesData);
        setStudios(studiosData);
        setShowtimes(showtimesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleScheduleChange = (e) => {
    const scheduleId = parseInt(e.target.value);
    const schedule = schedules.find((s) => s.id === scheduleId);
    setSelectedSchedule(schedule);
  };

  const handleShowtimeChange = (e) => {
    setSelectedShowtime(e.target.value);
  };

  const storeScheduleShowtime = async (e) => {
    e.preventDefault();
    if (!selectedSchedule || !selectedShowtime) {
      alert("Please select a schedule and a showtime.");
      return;
    }

    try {
      await createScheduleShowtimes({
        schedule_id: selectedSchedule.id,
        showtime_id: selectedShowtime,
      });
      alert("Schedule Showtime added successfully!");
      navigate("/admin/schedule_showtimes");
    } catch (error) {
      console.error("Error:", error);
      setErrors(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <section className="min-h-screen">
      <div className="px-6.5 py-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="text-xl font-semibold text-black dark:text-white uppercase border-b py-4">
          Add Schedule Showtime
        </h2>
        <form onSubmit={storeScheduleShowtime}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-4">
            {/* Pilih Schedule */}
            <div className="sm:col-span-2">
              <label className="mb-3 block text-sm font-bold text-gray-900 dark:text-white">
                Select Schedule
              </label>
              <select
                name="schedule"
                onChange={handleScheduleChange}
                value={selectedSchedule?.id || ""}
                className="w-full border rounded px-5 py-3 text-black dark:text-white bg-white dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">-- Select Schedule --</option>
                {schedules.map((schedule) => (
                  <option key={schedule.id} value={schedule.id}>
                    {schedule.movie.title || "No Movie"} -{" "}
                    {schedule.studio.name || "No Studio"}
                  </option>
                ))}
              </select>

              {errors.schedule_id && <Error res={errors.schedule_id} />}
            </div>

            {/* Detail Schedule Terpilih */}
            {selectedSchedule && (
              <div className="sm:col-span-2 p-4 border rounded bg-gray-100 dark:bg-gray-600 dark:text-white">
                <p>
                  <strong>Movie:</strong>{" "}
                  {selectedSchedule.movie.title || "Unknown"}
                </p>
                <p>
                  <strong>Studio:</strong>{" "}
                  {selectedSchedule.studio.name || "Unknown"}
                </p>
              </div>
            )}

            {/* Pilih Showtime */}
            <div className="sm:col-span-2">
              <label className="mb-3 block text-sm font-bold text-gray-900 dark:text-white">
                Select Showtime
              </label>
              <select
                name="showtime"
                onChange={handleShowtimeChange}
                value={selectedShowtime}
                className="w-full border rounded px-5 py-3 text-black dark:text-white bg-white dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">-- Select Showtime --</option>
                {showtimes.map((showtime) => (
                  <option key={showtime.id} value={showtime.id}>
                    {showtime.sequence.slice(0, 5)}
                  </option>
                ))}
              </select>

              {errors.showtime_id && <Error res={errors.showtime_id} />}
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 mt-4 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
          >
            Add Schedule Showtime
          </button>
        </form>
      </div>
    </section>
  );
}
