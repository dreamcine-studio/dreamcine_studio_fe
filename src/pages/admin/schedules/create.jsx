import { useEffect, useState } from "react";
import { getMovies } from "../../../services/movies";
import { getStudios } from "../../../services/studios";
import { useNavigate } from "react-router-dom";
import { createSchedules } from "../../../services/schedules";
import Error from "../../../components/Error";

export default function ScheduleCreate() {
  const [errors, setErrors] = useState([]);
  const [movies, setMovies] = useState([]);
  const [studios, setStudios] = useState([]);
  const [scheduleData, setScheduleData] = useState({
    movie_id: "",
    studio_id: "",
    showtime: ["", "", "", ""],
    showdate_start: "",
    showdate_end: "",
  });
  const navigate = useNavigate();
  const fetchMovies = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  const fetchStudios = async () => {
    const data = await getStudios();
    setStudios(data);
  };

  useEffect(() => {
    fetchMovies();
    fetchStudios();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleData({ ...scheduleData, [name]: value });
  };

  const handleShowtimeChange = (index, value) => {
    const updatedShowtimes = [...scheduleData.showtime];
    updatedShowtimes[index] = value;
    setScheduleData({ ...scheduleData, showtime: updatedShowtimes });
  };

  const handleInputChangeShowdate = (e) => {
    const { name, value } = e.target;
    setScheduleData({ ...scheduleData, [name]: value });
  };

  const storeSchedule = async (e) => {
    e.preventDefault();

    const showtimeArray = scheduleData.showtime.filter((time) => time !== ""); // Filter out empty strings

    const dataToSend = {
      ...scheduleData,
      showtime: showtimeArray,
    };

    console.log("Data yang akan dikirim:", showtimeArray); // Log data sebelum dikirim

    try {
      const response = await createSchedules(dataToSend); // Kirim data yang sudah diformat sebagai JSON
      console.log("Response dari backend:", response);
      navigate("/admin/schedules");
    } catch (error) {
      console.error("Error saat menambahkan data:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
        setErrors(error.response.data.message);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error lainnya:", error.message);
      }
    }
  };

  console.log(scheduleData);

  return (
    <>
      <section className="min-h-screen">
        <div className="px-6.5 py-4 dark:border-strokedark mx-auto max-w-2xl lg:py-16">
          <h2 className="text-xl font-semibold text-black dark:text-white uppercase border-b py-4">
            Add Schedule Data
          </h2>
          <form onSubmit={storeSchedule}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-4">
              <div className="sm:col-span-2">
                <label className="mb-3 block text-sm font-bold text-gray-900 dark:text-white">
                  Movie
                </label>
                 {errors.movie_id && (
                       <Error res={errors.movie_id[0]} />
                     )}

                <select
                  name="movie_id"
                  onChange={handleInputChange}
                  value={scheduleData.movie_id}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-blue-600 active:border-blue-600 :border-form-stroke :bg-form-input :focus:border-blue-600 dark:text-white"
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
                {errors.studio_id && (
                       <Error res={errors.studio_id[0]} />
                     )}


                <select
                  name="studio_id"
                  onChange={handleInputChange}
                  value={scheduleData.studio_id}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-blue-600 active:border-blue-600 :border-form-stroke :bg-form-input :focus:border-blue-600 dark:text-white"
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
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white :text-white dark:text-white">
                  Showdate Start
                </label>
                {errors.showdate_start && (
                       <Error res={errors.showdate_start[0]} />
                     )}


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
                {errors.showdate_end && (
                       <Error res={errors.showdate_end[0]} />
                     )}

                <input
                  type="date"
                  name="showdate_end"
                  onChange={handleInputChangeShowdate}
                  value={scheduleData.showdate_end}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-blue-600 active:border-blue-600 :border-form-stroke :bg-form-input :focus:border-blue-600 dark:text-white"
                />
              </div>
              <div className="flex gap-8">
                {scheduleData.showtime.map((time, index) => (
                  <div className="w-1/2" key={index}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Showtime {index + 1}
                    </label>
                    {errors.showtime && (
                       <Error res={errors.showtime[0]} />
                     )}

                    <input
                      type="time"
                      name={`showtime[${index}]`} // Penting: name tetap seperti ini
                      value={time}
                      onChange={(e) =>
                        handleShowtimeChange(index, e.target.value)
                      }
                      className="bg-gray-50 dark:bg-gray-200 border border-gray-300 text-gray-900 dark:text-black text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required=""
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 :focus:ring-blue-900 hover:bg-blue-800"
            >
              Add Schedule
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
