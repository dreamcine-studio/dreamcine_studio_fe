import { useEffect, useState, useRef } from "react";
import { showMovie } from "../../../services/movies";
import { getGenres } from "../../../services/genre";
import { getSchedules } from "../../../services/schedules";
import { getStudios } from "../../../services/studios";
import { Link, useParams } from "react-router-dom";
import { publicStorage } from "../../../api";
import { getScheduleShowtimes } from "../../../services/scheduleshowtime";
import { getShowtimes, showShowtimes } from "../../../services/showtime";

export default function MovieDetail() {
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [scheduleshowtimes, setScheduleShowtimes] = useState([]);
  const [studios, setStudios] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const { id } = useParams();
  const scheduleRef = useRef(null); // Referensi ke bagian jadwal

  function formatDateString(dateString) {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  }

  useEffect(() => {
    // Scroll ke atas saat halaman pertama kali ditampilkan
    window.scrollTo(0, 0);

    const fetchMovie = async () => {
      try {
        const data = await showMovie(id);
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      }
    };

    const fetchShowtime = async () => {
      try {
        const data = await getShowtimes();
        setShowtimes(data);
      }catch (error) {
        console.error("Failed to fetch movie:", error);
      }
    };


    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    const fetchSchedules = async () => {
      try {
        const data = await getSchedules();
        const filteredSchedules = data.filter(
          (schedule) => schedule.movie_id === parseInt(id)
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

    const fetchScheduleShowtimes = async () => {
      try {
        const data = await getScheduleShowtimes();
        setScheduleShowtimes(data);
      } catch (error) {
        console.error("Failed to fetch studios:", error);
      }
    };

    fetchMovie();
    fetchGenres();
    fetchSchedules();
    fetchStudios();
    fetchShowtime();
    fetchScheduleShowtimes()
  }, [id]);

  const getGenreName = (id) => {
    const genre = genres.find((item) => item.id === id);
    return genre ? genre.name : "Unknown Genre";
  };

  const handleShowtimeClick = (schedule, showtime) => {
    const showtimeDetail = showtimes.find((s) => s.id === showtime.showtime_id);
    
    // Cari schedule_showtime.id berdasarkan schedule_id dan showtime_id
    const scheduleShowtime = scheduleshowtimes.find(
      (s) => s.schedule_id === schedule.id && s.showtime_id === showtime.showtime_id
    );
  
    const selected = {
      ...schedule,
      time: showtimeDetail?.sequence || "Unknown Time",
      scheduleShowtimeId: scheduleShowtime?.id || null, // Simpan ID schedule_showtime
    };
  
    setSelectedShowtime(selected);
    console.log("Selected Showtime:", selected);
  };
  
  
  
  

  const handleShowSchedule = () => {
    setShowSchedule(true);

    // Tunggu sebentar untuk memastikan jadwal ditampilkan, lalu scroll
    setTimeout(() => {
      scheduleRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="w-full p-4 dark:bg-gray-900 mt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4 p-4">
          <div className="flex flex-col w-full md:w-1/2 px-4 mb-8 items-center">
            {movie.poster ? (
              <img
                // src={movie.poster}
              src={publicStorage + movie.poster}
                
                className="h-96 w-auto rounded-lg shadow-md mx-auto mb-4"
                alt={movie.title}
              />
            ) : (
              <p className="text-gray-400">Poster not available</p>
            )}
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-2 dark:text-white">
              {movie.title}
            </h2>
            <p className="text-gray-600 mb-4">{getGenreName(movie.genre_id)}</p>
            <div>
              <p className="mb-6 dark:text-gray-200">
                <i className="fa-solid fa-clock mr-2"></i>
                {movie.duration} minutes
              </p>
            </div>

            <p className="mb-6 dark:text-gray-200">{movie.description}</p>

            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Cast By:
              </h3>
              <p className="mb-4 dark:text-gray-200">{movie.cast}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Release Date:
              </h3>
              <p className="mb-4 dark:text-gray-200">{movie.release_date}</p>
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={handleShowSchedule}
                className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <i className="fa-solid fa-ticket"></i>
                Show Schedule
              </button>
            </div>
          </div>

          {showSchedule && (
  <div className="w-full p-4" ref={scheduleRef}>
    <div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
        Jadwal Tayang:
      </h3>
      <div className="flex flex-wrap gap-4">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="bg-gray-100 mb-4 dark:text-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-md md:w-1/4"
          >
            <h4 className="text-lg font-bold mb-2 dark:text-white">
              {schedule.showdate_start &&
                formatDateString(schedule.showdate_start)}
            </h4>
            <p>
              Studio:{" "}
              {studios.find(
                (studio) => studio.id === schedule.studio_id
              )?.name || "Unknown Studio"}
            </p>

            <div className="flex flex-wrap gap-2">
  {/* Filter showtimes berdasarkan schedule_id */}
  {scheduleshowtimes
    .filter((showtime) => showtime.schedule_id === schedule.id) // Memfilter showtimes berdasarkan schedule_id
    .map((showtime) => (
      <div
        key={showtime.id}
        className="bg-gray-200 text-gray-800 py-2 px-4 rounded cursor-pointer"
        onClick={() => handleShowtimeClick(schedule, showtime)} // Mengirimkan schedule dan showtime
      >
        {showtimes.find((s) => s.id === showtime.showtime_id)?.sequence.slice(0, 5) || "Unknown Time"}

      </div>
    ))}
</div>

          </div>
        ))}
      </div>
    </div>

    {selectedShowtime && (
  <div className="mt-4 p-4 bg-gray-200 rounded-lg">
    <h4 className="text-lg font-bold">Selected Showtime:</h4>
    <p>
      Date: {formatDateString(selectedShowtime.showdate_start)}
    </p>
    <p>Time: {selectedShowtime.time.slice(0, 5)}</p>

    <p>
      Studio:{" "}
      {studios.find(
        (studio) => studio.id === selectedShowtime.studio_id
      )?.name || "Unknown Studio"}
    </p>
    <Link
  to={`/moviebooking?schedule_id=${selectedShowtime.id}&movie_id=${movie.id}&showtime=${selectedShowtime.time}&studio_id=${selectedShowtime.studio_id}&showdate_start=${selectedShowtime.showdate_start}&scheduleshowtime=${selectedShowtime.scheduleShowtimeId}`}
  className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
>
  <i className="fa-solid fa-ticket"></i>
  Book Your Ticket Here
</Link>

  </div>
)}

  </div>
)}

        </div>
      </div>
    </div>
  );
}
