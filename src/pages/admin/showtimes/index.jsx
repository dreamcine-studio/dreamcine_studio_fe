import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteShowtimes, getShowtimes } from "../../../services/showtime";

export default function AdminShowtimes() {
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const showtimesData = await getShowtimes();
        setShowtimes(showtimesData);
      } catch (error) {
        setError("Failed to fetch data, please try again later.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, []);

  if (loading) {
    return (
      <main className="py-6 px-12 space-y-2 bg-gray-300 min-h-screen w-full flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 border-4 border-solid border-transparent rounded-full animate-spin border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-pink-500"></div>
          <div className="text-2xl font-bold text-gray-800 animate-bounce">Please Wait ..</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="py-6 px-12 space-y-2 bg-gray-100 min-h-screen w-full flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-500">{error}</div>
      </main>
    );
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this showtime?");

    if (confirmDelete) {
      try {
        await deleteShowtimes(id);
        setShowtimes(showtimes.filter((s) => s.id !== id));
        alert("Showtime deleted successfully");
      } catch (error) {
        console.error("Error deleting schedule:", error);
        alert("Failed to delete the schedule. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1 min-h-screen">
        <div className="flex items-center gap-6 justify-start">
          <h1 className="text-2xl text-center font-bold dark:text-white">Showtimes</h1>
          <Link
            to={`/admin/showtimes/create`}
            className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            <i className="fa-solid fa-plus mr-2"></i>
            Add Data
          </Link>
        </div>

        <div className="flex justify-center items-center max-w-full overflow-x-auto mt-4">
          <table className="w-full table-auto">
            <thead className="border-b bg-gray-50 dark:bg-gray-900 text-white">
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-bold text-gray-700 dark:text-white uppercase">Sequence</th>
                <th className="py-4 px-4 font-bold text-gray-700 dark:text-white uppercase">Controls</th>
              </tr>
            </thead>
            <tbody>
              {showtimes.map((showtime) => (
                <tr key={showtime.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="py-4 px-4 text-black dark:text-white">{showtime.sequence.slice(0, 5)}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3.5">
                      <Link to={`/admin/showtimes/edit/${showtime.id}`}>
                        <i className="fa-solid fa-pen-to-square text-orange-500 cursor-pointer"></i>
                      </Link>
                      <button onClick={() => handleDelete(showtime.id)}>
                        <i className="fa-solid fa-trash text-red-700 dark:text-red-500 cursor-pointer"></i>
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
