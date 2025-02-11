import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteBooking, getBooking } from "../../../services/booking";
import { getSchedules } from "../../../services/schedules";

export default function AdminBookings() {
  const [bookings, setBooking] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [bookingsData, schedulesData] = await Promise.all([
          getBooking(),
          getSchedules(),
        ]);
        setBooking(bookingsData);
        setSchedules(schedulesData);

    console.log(bookingsData);

      } catch (error) {
        setError("Failed to fetch data, please try again later : ");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, []);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    }).format(new Date(timestamp));
  };
  
  
  if (loading) {
    return (
      <main className="py-6 px-12 space-y-2 bg-gray-300 min-h-screen w-full flex items-center justify-center">
        {/* Loading Spinner */}
        <div className="flex items-center space-x-4">
          <div
            className="w-16 h-16 border-4 border-solid border-transparent rounded-full
          animate-spin
          border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-pink-500"
          ></div>
          {/* Teks dengan Efek Bounce */}
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
  const getScheduledateStart = (id) => {
    const schedule = schedules.find((g) => g.id === id);
    return schedule ? schedule.showdate_start : "Unknown Schedule";
  };
  const getScheduledateEnd = (id) => {
    const schedule = schedules.find((g) => g.id === id);
    return schedule ? schedule.showdate_end : "Unknown Schedule";
  };

  const handleDelete = async (id) => {
    // deleteBook dari services jangan lupa di inport
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin Menghapus Data ini ?"
    );

    if (confirmDelete) {
      await deleteBooking(id);

      // ini kita update pakai setter Books
      setBooking(bookings.filter((booking) => booking.id !== id));
    }
  };

  return (
    <div className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1 min-h-screen">
      <div className="flex items-center gap-6 justify-center">
        <h1 className="text-2xl text-center font-bold dark:text-white">
          Bookings
        </h1>
        {/* <Link
        to={"/admin/bookings/create"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <i className="fa-solid fa-plus mr-2"></i>
        Add Data
      </Link> */}
      </div>

      <div className="max-w-full overflow-x-auto mt-4">
        <table className="w-full table-auto">
          <thead className="border-b bg-gray-50 dark:bg-gray-900 text-white">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                user {/*user_id*/}
              </th>
              <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                schedule {/*schedule_id*/}
              </th>
              <th className="px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                quantity
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
          <p className="px-4 text-black dark:text-white">
            {booking.user_id}
          </p>
        </td>

        <td className="px-4 py-5">
          <p className="px-4 text-black dark:text-white">
            {booking.schedule_id}
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
          <div className="flex items-center space-x-3.5">
            <button onClick={() => handleDelete(booking.id)}>
              <i className="fa-solid fa-trash text-red-700 dark:text-red-500"></i>
            </button>
          </div>
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
