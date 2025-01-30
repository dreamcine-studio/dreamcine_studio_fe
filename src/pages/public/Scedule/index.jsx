import { useEffect, useState } from "react";
import { getMovies } from "../../../services/movies";
import { getSchedules } from "../../../services/schedules";
import { getStudios } from "../../../services/studios";
import { useParams } from "react-router-dom";

export default function MovieSchedule () {
  // const movieData = [
  //   {
  //     location: 'KELAPA GADING XXI',
  //     date: '24-01-2025',
  //     times: ['13:20', '15:45', '18:10', '20:35'],
  //     price: 'Rp 60,000',
  //   },
  //   {
  //     location: 'PLAZA SENAYAN XXI',
  //     date: '24-01-2025',
  //     times: ['13:15', '15:40', '18:05', '20:30'],
  //     price: 'Rp 60,000',
  //   },
  // ];

  const [schedules, setSchedules] = useState([]);
  const [movies, setMovies] = useState([]);
  const [studios, setStudios] = useState([]);
  const { id }  = useParams();

  useEffect(() => {  
    const fetchMovies = async () => {  
      const data = await getMovies();  
      setMovies(data);  
    };
    
    const fetchSchedules = async () => {  
      const data = await getSchedules();  
      setSchedules(data);  
    };

    const fetchStudio = async () => {  
      const data = await getStudios();  
      setStudios(data);  
    };

    fetchMovies();  
    fetchSchedules();  
    fetchStudio();  
  }, [])

  const getMovieData = (id) => {
    const movie = movies.find((m) => m.id === id);
    return movie
      ? {
          title: movie.title,
          poster: movie.poster,
          duration: movie.duration,
          price: movie.price,
        }
      : {
          title: "Unknown Movie",
          poster: "",
          duration: "",
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


  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Poster Section */}
          <div className="w-full md:w-1/3 p-4">
            <img
              src="https://via.placeholder.com/300x450" // Ganti dengan URL gambar film
              alt="Sky Force Poster"
              className="w-full rounded-md shadow-md"
            />
          </div>

          {/* Movie Info Section */}
          {schedules.map((schedule) => (
          <div key={schedule.id} className="w-full md:w-2/3 p-4">
            <h1 className="text-2xl font-bold text-gray-800">{getMovieData(schedule.movie_id).title}</h1>
            <p className="text-sm text-gray-600 mb-2">{getMovieData(schedule.movie_id).duration} Minutes</p>
            <div className="flex gap-2 mb-4">

            {/* Schedule Section */}
            
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700">{getStudioData(schedule.studio_id).name}</h2>
                <p className="text-sm text-gray-500 mb-2">{schedule.showdate_start} - {schedule.showdate_end}</p>
                <div className="flex gap-2 flex-wrap">
                    <button
                      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition text-gray-800"
                    >
                      {schedule.showtime}
                    </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">Rp. {getMovieData(schedule.movie_id).price}</p>
              </div>
          </div>
        </div>
        ))}
      </div>
    </div>
    </div>
  )
}
