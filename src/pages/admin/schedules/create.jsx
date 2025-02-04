import { useEffect, useState } from "react";
import { getMovies } from "../../../services/movies";
import { getStudios } from "../../../services/studios";
import { useNavigate } from "react-router-dom";
import { createSchedules } from "../../../services/schedules";

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
      <section className="bg-white :bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 :text-white">
            Add New Schedule
          </h2>
          <form onSubmit={storeSchedule}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label className="mb-3 block text-sm font-bold text-gray-900">
                  Movie
                </label>
                <select
                  name="movie_id"
                  onChange={handleInputChange}
                  value={scheduleData.movie_id}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-indigo-600 active:border-indigo-600 :border-form-stroke :bg-form-input :focus:border-indigo-600"
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
                <label className="mb-3 block text-sm font-bold text-gray-900">
                  Studio
                </label>
                <select
                  name="studio_id"
                  onChange={handleInputChange}
                  value={scheduleData.studio_id}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-indigo-600 active:border-indigo-600 :border-form-stroke :bg-form-input :focus:border-indigo-600"
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
                <label className="block mb-2 text-sm font-medium text-gray-900 :text-white">
                  Showdate Start
                </label>
                <input
                  type="date"
                  name="showdate_start"
                  onChange={handleInputChangeShowdate}
                  value={scheduleData.showdate_start}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-indigo-600 active:border-indigo-600 :border-form-stroke :bg-form-input :focus:border-indigo-600"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 :text-white">
                  Showdate End
                </label>
                <input
                  type="date"
                  name="showdate_end"
                  onChange={handleInputChangeShowdate}
                  value={scheduleData.showdate_end}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-indigo-600 active:border-indigo-600 :border-form-stroke :bg-form-input :focus:border-indigo-600"
                />
              </div>

              {/* <div className="flex gap-8">
              <div className="w-1/2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Showtime
                </label>
                <input
                  type="time"
                  name="showtime[]"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-indigo-500 :focus:border-indigo-500"
                  required=""
                />
              </div>
              
              
              <div className="w-1/2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Showtime
                </label>
                <input
                  type="time"
                  name="showtime[]"
                  onChange={handleShowtimeChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-indigo-500 :focus:border-indigo-500"
                  required=""
                />
                
              </div>
              
              <div className="w-1/2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Showtime
                </label>
                <input
                  type="time"
                  name="showtime[]"
                  onChange={handleShowtimeChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-indigo-500 :focus:border-indigo-500"
                  required=""
                />
              </div>

              <div className="w-1/2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Showtime
                </label>
                <input
                  type="time"
                  name="showtime[]"
                  onChange={handleShowtimeChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-indigo-500 :focus:border-indigo-500"
                  required=""
                />
              </div>
   
              </div> */}

              <div className="flex gap-8">
                {scheduleData.showtime.map((time, index) => (
                  <div className="w-1/2" key={index}>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Showtime {index + 1}
                    </label>
                    <input
                      type="time"
                      name={`showtime[${index}]`} // Penting: name tetap seperti ini
                      value={time}
                      onChange={(e) =>
                        handleShowtimeChange(index, e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                      required=""
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg focus:ring-4 focus:ring-indigo-200 :focus:ring-indigo-900 hover:bg-indigo-800"
            >
              Add Schedule
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
