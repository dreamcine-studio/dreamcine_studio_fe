import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteBooking, getBooking } from "../../../services/booking";
import { getSchedules } from "../../../services/schedules";
import { getMovies } from "../../../services/movies";
import { getUsers } from "../../../services/user";

export default function AdminBookings() {
  const [bookings, setBooking] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [bookingsData, schedulesData, movieData, userData] = await Promise.all([
          getBooking(),
          getSchedules(),
          getMovies(),
          getUsers(),
        ]);
        setBooking(bookingsData);
        setSchedules(schedulesData);
        setMovies(movieData);
        setUsers(userData);
      } catch (error) {
        setError("Failed to fetch data, please try again later : ");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getMovieDetails = (scheduleId) => {
    const schedule = schedules.find((s) => s.id === scheduleId);
    if (!schedule) return { title: "Unknown Movie" };

    const movie = movies.find((m) => m.id === schedule.movie_id);
    return movie || { title: "Unknown Movie" };
  };

  const getUserInfoName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown User";
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const formatTimestamp = (timestamp) => {
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(timestamp));
  
    const parts = formattedDate.split(' ');
  
    parts[0] = parts[0] + ','; 
  
    return parts.join(' ');
  };
  
  if (loading) {
    return (
      <main className="py-6 px-12 space-y-2 bg-gray-300 min-h-screen w-full flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div
            className="w-16 h-16 border-4 border-solid border-transparent rounded-full animate-spin border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-pink-500"
          ></div>
          <div className="text-2xl font-bold text-gray-800 animate-bounce">
            Please Wait ..
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="py-l px-12 space-y-2 bg-gray-100 min-h-screen w-full flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-500"> {error} .. </div>
      </main>
    );
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin Menghapus Data ini ?");
    if (confirmDelete) {
      await deleteBooking(id);
      setBooking(bookings.filter((booking) => booking.id !== id));
    }
  };

  return (
    <div className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1 min-h-screen">
      <div className="flex items-center gap-6 justify-center">
        <h1 className="text-2xl text-center font-bold dark:text-white">
          Bookings
        </h1>
      </div>

      <div className="max-w-full overflow-x-auto mt-4">
        <table className="w-full table-auto">
          <thead className="border-b bg-gray-50 dark:bg-gray-900 text-white">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                User
              </th>
              <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                Movie
              </th>
              <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                Quantity
              </th>
              <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                Total Price
              </th>
              <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                Showtime
              </th>
              <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                Booking Date
              </th>
              <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {getUserInfoName(booking.user_id)}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {getMovieDetails(booking.schedule_id).title}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <p className="px-4 text-black dark:text-white">
                      {booking.quantity}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {formatRupiah(booking.amount)}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <p className="px-4 text-black dark:text-white">
                      {booking.showtime.slice(0, 5)}
                    </p>
                  </td>
                  <td className="py-5">
                    <p className="px-4 text-black dark:text-white">
                      {formatTimestamp(booking.created_at)}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <button onClick={() => handleDelete(booking.id)}>
                      <i className="fa-solid fa-trash text-red-700 dark:text-red-500"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <p>Tidak ada data Booking</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}