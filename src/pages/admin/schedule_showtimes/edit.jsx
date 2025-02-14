import { useEffect, useState } from "react";
import { getSchedules } from "../../../services/schedules";
import { getMovies } from "../../../services/movies";
import { getStudios } from "../../../services/studios";
import { getShowtimes } from "../../../services/showtime";
import { showScheduleShowtimes, updateScheduleShowtimes } from "../../../services/scheduleshowtime";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../../components/Error";

export default function ScheduleShowtimeEdit() {
  const [errors, setErrors] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Ambil ID dari URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schedulesData = await getSchedules();
        const moviesData = await getMovies();
        const studiosData = await getStudios();
        const showtimesData = await getShowtimes();
        const scheduleShowtimeData = await showScheduleShowtimes(id); // Ambil data berdasarkan ID

        // Mapping untuk mendapatkan movie title dan studio name
        const enhancedSchedules = schedulesData.map(schedule => ({
          ...schedule,
          movie: moviesData.find(movie => movie.id === schedule.movie_id) || {},
          studio: studiosData.find(studio => studio.id === schedule.studio_id) || {},
        }));

        // Ambil schedule berdasarkan ID yang sedang diedit
        const currentSchedule = enhancedSchedules.find(schedule => schedule.id === scheduleShowtimeData.schedule_id);

        setSchedules(enhancedSchedules);
        setShowtimes(showtimesData);
        setSelectedSchedule(currentSchedule);
        setSelectedShowtime(scheduleShowtimeData.showtime_id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleShowtimeChange = (e) => {
    setSelectedShowtime(e.target.value);
  };

  const updateScheduleShowtime = async (e) => {
    e.preventDefault();
    if (!selectedSchedule || !selectedShowtime) {
      alert("Please select a showtime.");
      return;
    }

    try {
      await updateScheduleShowtimes(id, {
        schedule_id: selectedSchedule.id,
        showtime_id: selectedShowtime,
        _method: "PUT",
      });
      alert("Schedule Showtime updated successfully!");
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
          Edit Schedule Showtime
        </h2>
        <form onSubmit={updateScheduleShowtime}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-4">
            {/* Pilih Schedule (Disabled, karena hanya ditampilkan) */}
            <div className="sm:col-span-2">
              <label className="mb-3 block text-sm font-bold text-gray-900 dark:text-white">
                Selected Schedule
              </label>
              <select
                name="schedule"
                value={selectedSchedule?.id || ""}
                disabled // Tetap ditampilkan tapi tidak bisa diubah
                className="w-full border rounded px-5 py-3 text-black dark:text-white bg-gray-300 dark:bg-gray-700 dark:border-gray-600"
              >
                {selectedSchedule && (
                  <option value={selectedSchedule.id}>
                    {selectedSchedule.movie.title || "No Movie"} - {selectedSchedule.studio.name || "No Studio"}
                  </option>
                )}
              </select>
            </div>

            {/* Detail Schedule Terpilih */}
            {selectedSchedule && (
              <div className="sm:col-span-2 p-4 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white">
                <p><strong>Movie:</strong> {selectedSchedule.movie.title || "Unknown"}</p>
                <p><strong>Studio:</strong> {selectedSchedule.studio.name || "Unknown"}</p>
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

            {/* Tombol Update */}
            <button
              type="submit"
              className="px-5 py-2.5 mt-4 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Update Showtime
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
