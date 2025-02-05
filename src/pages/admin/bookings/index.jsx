import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteBooking, getBooking } from "../../../services/booking";
import { getSchedules } from "../../../services/schedules";

export default function AdminBookings() {
  const [Bookings, setBooking] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [Loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
  
    const fetchData = async () => {
      setLoading(true);
      setError(null);
    
      try {
        const [
          bookingsData,
          schedulesData,
        ] = await Promise.all( [
          getBooking(),
          getSchedules(),
	]);
  setBooking(bookingsData);
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



  console.log("ada", Bookings);

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
      setBooking(Bookings.filter((booking) => booking.id !== id));
    }
  };

  return (
    <div className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Link
        to={"/admin/bookings/create"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Tambah data
      </Link>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="border-b bg-gray-50 text-white">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                user {/*user_id*/}
              </th>
              <th className="min-w-[220px] px-9 py-4 font-medium text-black dark:text-white">
                schedule {/*schedule_id*/}
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                quantity
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                booking_date
              </th>

              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Bookings.length > 0 ? (
              Bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {" "}
                      {booking.user_id}
                    </p>
                  </td>

                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {getScheduledateStart(booking.schedule_id)} -{" "}
                      {getScheduledateEnd(booking.schedule_id)}
                    </p>
                  </td>

                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {" "}
                      {booking.quantity}
                    </p>
                  </td>

                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {" "}
                      {booking.booking_date}
                    </p>
                  </td>

                  <td className="px-4 py-5">
                    <div className="flex items-center space-x-3.5">
                      <Link to={`/admin/bookings/edit/${booking.id}`}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button onClick={() => handleDelete(booking.id)}>
                        <i className="fa-solid fa-trash"></i>
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
