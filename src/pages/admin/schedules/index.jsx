import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovies } from "../../../services/movies";
import { deleteSchedules, getSchedules } from "../../../services/schedules";
import { getStudios } from "../../../services/studios";

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
        const [
          schedulesData,
          moviesData,
          studiosData,
      ] = await Promise.all( [
        getSchedules(),
        getMovies(),
        getStudios(),
        
		]);

    setStudios(studiosData);
    setMovies(moviesData);
    setSchedules(schedulesData);
	}catch (error){
		setError("Failed to fetch data, please try again later : ")
    console.log(error)
	} finally {
		setLoading(false)
	}
}

fetchData();
	
}, []);

if (Loading) {
  return (
    <main className="py-6 px-12 space-y-2 bg-gray-300 min-h-screen w-full flex items-center justify-center">
      {/* Loading Spinner */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 border-4 border-solid border-transparent rounded-full
          animate-spin
          border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-pink-500">
        </div>
        {/* Teks dengan Efek Bounce */}
        <div className="text-2xl font-bold text-gray-800 animate-bounce">
          Please Wait ..
        </div>
      </div>
    </main>
  );
}

  
if (error){
	return (
		<main className="py-l px-12 space-y-2 bg-gray-100 min-h-screen w-full flex items-center justify-center">
			<div className="text-2xl font-bold text-gray-500"> {error} .. </div>
		</main>
	)
}



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

  console.log("tes", schedules);
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
                    <div>
                      {schedule.showdate_start} - {schedule.showdate_end}
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="flex items-center gap-4 mx-2">
                      <Link to={`/admin/schedules/edit/${schedule.id}`}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button onClick={() => handleDelete(schedule.id)}>
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
