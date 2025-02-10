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
    showtime: ["", "", "", ""], // Initialize showtime as an array of strings
    showdate_start: "",
    showdate_end: "",
    // _method: "PUT",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchSchedules = async () => {
    try {
      const data = await getSchedules();
      const schedule = data.find((schedule) => schedule.id === parseInt(id));
      if (schedule) {
        setScheduleData({
          movie_id: schedule.movie_id,
          studio_id: schedule.studio_id,
          showtime: schedule.showtime || ["", "", "", ""], 
          showdate_start: schedule.showdate_start,
          showdate_end: schedule.showdate_end,
        });
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
      // Handle error, e.g., display a message to the user
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

  const fetchStudios = async () => {
    try {
      const data = await getStudios();
      setStudios(data);
    } catch (error) {
      console.error("Error fetching studios:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
    fetchMovies();
    fetchStudios();
  }, []);

  const handleShowtimeChange = (index, value) => {
    const updatedShowtimes = [...scheduleData.showtime];
    updatedShowtimes[index] = value;
    setScheduleData({ ...scheduleData, showtime: updatedShowtimes });
  };

  const handleInputChangeShowdate = (e) => {
    const { name, value } = e.target;
    setScheduleData({ ...scheduleData, [name]: value });
  };

  const updateSchedule = async (e) => {
    e.preventDefault();

    const showtimeArray = scheduleData.showtime.filter((time) => time !== "");

    const dataToSend = {
      ...scheduleData,
      showtime: showtimeArray,
    };

    try {
      const response = await updateSchedules(id, dataToSend);
      console.log("Response from backend:", response);
      navigate("/admin/schedules");
    } catch (error) {
      console.error("Error adding data:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
        setErrors(error.response.data.message); // Set error message
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Other error:", error.message);
      }
    }
  };

  return (
    <>
      <section className="min-h-screen">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="border-b mb-4 text-xl font-bold text-gray-900 dark:text-white uppercase py-4">
            Edit Schedule
          </h2>
          <form onSubmit={updateSchedule}>
            <div className="grid gap-4 sm:grid-cols-2 pt-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label className="mb-3 block text-sm font-bold text-gray-900 dark:text-white">
                  Movie
                </label>
                <select
                  name="movie_id"
                  disabled
                  value={scheduleData.movie_id}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition text-gray-600 dark:text-gray-200"
                >
                  <option value="">--select movie--</option>
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
                  disabled
                  value={scheduleData.studio_id}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition text-gray-600 dark:text-gray-200"
                >
                  <option value="">--select studio--</option>
                  {studios.map((studio) => (
                    <option key={studio.id} value={studio.id}>
                      {studio.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white :text-white">
                  Showdate Start
                </label>
                <input
                  type="date"
                  name="showdate_start"
                  onChange={handleInputChangeShowdate}
                  value={scheduleData.showdate_start}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-blue-600 active:border-blue-600 :border-form-stroke :bg-form-input :focus:border-blue-600 dark:text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white :text-white">
                  Showdate End
                </label>
                <input
                  type="date"
                  name="showdate_end"
                  onChange={handleInputChangeShowdate}
                  value={scheduleData.showdate_end}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-blue-600 active:border-blue-600 :border-form-stroke :bg-form-input :focus:border-blue-600 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1, 2, 3].map((index) => (
                    <div key={index}>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Showtime {index + 1}
                      </label>
                      <input
                        type="time"
                        value={scheduleData.showtime[index] || ""}
                        onChange={(e) =>
                          handleShowtimeChange(index, e.target.value)
                        }
                        className="bg-gray-50 dark:bg-gray-200 border border-gray-300 text-gray-900 dark:text-black text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 :focus:ring-blue-900 hover:bg-blue-800"
            >
              Edit Schedule
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
