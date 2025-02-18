import { useEffect, useState } from "react";
import { deleteSeat, getSeats, updateSeat } from "../../../services/seat";
import { getStudios } from "../../../services/studios";
import { getSchedules } from "../../../services/schedules";
import { getScheduleShowtimes } from "../../../services/scheduleshowtime";
import { getMovies } from "../../../services/movies";
import { getShowtimes } from "../../../services/showtime";
import { getBooking } from "../../../services/booking";
import { getPayments } from "../../../services/payment";

export default function AdminSeats() {
  const [seats, setSeats] = useState([]);
  const [studios, setStudios] = useState([]);
  const [movies, setMovies] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [schedulesShowtimes, setSchedulesShowtimes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [
          seatsData,
          movieData,
          studiosData,
          schedulesData,
          showtimesData,
          scheduleShowtimesData,
          bookingDatas,
          paymentDatas,
        ] = await Promise.all([
          getSeats(),
          getMovies(),
          getStudios(),
          getSchedules(),
          getShowtimes(),
          getScheduleShowtimes(),
          getBooking(),
          getPayments(),
        ]);

        // Update seats with payment status
        const updatedSeats = await Promise.all(
          seatsData.map(async (seat) => {
            const payment = paymentDatas.find((p) => p.booking_id === seat.id);
            const booking = bookingDatas.find((b) => b.id === seat.booking_id);

            let isBooked = seat.isbooked;
            if (payment) {
              if (payment.status === "failed") {
                isBooked = 0;
              } else if (
                booking &&
                (payment.status === "confirmed" || payment.status === "pending")
              ) {
                isBooked = 1;
              }
            }

            // Update seat status in the backend
            if (seat.isbooked !== isBooked) {
              try {
                await updateSeat(seat.id, {
                  _method: "PUT",
                  isbooked: isBooked,
                  schedule_showtime_id: seat.schedule_showtime_id,
                  seat_number: seat.seat_number,
                  showdate: seat.showdate,
                });
              } catch (error) {
                console.error("Failed to update seat:", error);
              }
            }

            return {
              ...seat,
              paymentStatus: payment ? payment.status : "pending",
              isbooked: isBooked,
            };
          })
        );

        // Kelompokkan kursi berdasarkan schedule_showtime_id dan showdate
        const groupedSeats = updatedSeats.reduce((acc, seat) => {
          const key = `${seat.schedule_showtime_id}-${seat.showdate}`;

          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(seat); // Setiap kursi tetap dibuat row sendiri

          return acc;
        }, {});

        // Konversi hasil reduce ke array dengan format yang lebih terstruktur
        setSeats(Object.values(groupedSeats).flat());

        setStudios(studiosData);
        setMovies(movieData);
        setSeats(updatedSeats); // Updated seats with payment status
        setSchedules(schedulesData);
        setShowtimes(showtimesData);
        setSchedulesShowtimes(scheduleShowtimesData);
        setBookings(bookingDatas);
      } catch (error) {
        setError("Failed to fetch data, please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const updateBookedStatus = async (seatId, status) => {
  //   try {
  //     // Update status di backend
  //     const response = await updateSeat(seatId, { isbooked: status === "Booked" ? 1 : 0 });
  //     if (response.success) {
  //       // Fetch data terbaru dan perbarui state seats
  //       const updatedSeats = await getSeats();
  //       setSeats(updatedSeats);
  //     }
  //   } catch (error) {
  //     console.error("Update failed:", error);
  //   }
  // };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      await deleteSeat(id);
      setSeats(seats.filter((seat) => seat.id !== id));
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold dark:text-white text-center mb-6">
        Seats
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto mt-6 border-collapse border border-gray-300">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white">
            <tr>
              <th className="p-3 border">Studio</th>
              <th className="p-3 border">Movie</th>
              <th className="p-3 border">Showtime</th>
              <th className="p-3 border">Showdate</th>
              <th className="p-3 border">Seat Numbers</th>
              <th className="p-3 border">Is Booked</th>
              <th className="p-3 border">Payment Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {schedulesShowtimes.flatMap((scheduleShowtime) => {
              const schedule = schedules.find(
                (s) => s.id === scheduleShowtime.schedule_id
              );
              const movie = movies.find((m) => m.id === schedule?.movie_id) || {
                title: "Unknown",
              };
              const studio = studios.find(
                (s) => s.id === schedule?.studio_id
              ) || { name: "Unknown" };
              const showtime = showtimes.find(
                (st) => st.id === scheduleShowtime.showtime_id
              );

              // Dapatkan semua kursi untuk schedule_showtime_id ini
              const filteredSeats = seats.filter(
                (seat) => seat.schedule_showtime_id === scheduleShowtime.id
              );

              return filteredSeats.map((seat, index) => (
                <tr
                  key={`${scheduleShowtime.id}-${seat.id}`}
                  className="border"
                >
                  {/* Hanya tampilkan Studio, Movie, Showtime pada kursi pertama di setiap kelompok */}
                  {index === 0 && (
                    <>
                      <td
                        rowSpan={filteredSeats.length}
                        className="p-3 border dark:text-white"
                      >
                        {studio.name}
                      </td>
                      <td
                        rowSpan={filteredSeats.length}
                        className="p-3 border dark:text-white"
                      >
                        {movie.title}
                      </td>
                      <td
                        rowSpan={filteredSeats.length}
                        className="p-3 border dark:text-white text-center"
                      >
                        {showtime.sequence.slice(0, 5)}
                      </td>
                    </>
                  )}

                  <td className="px-2 border dark:text-white text-center">
                    {seat.showdate}
                  </td>
                  <td className="p-3 border dark:text-white text-center">
                  {Array.isArray(seat.seat_number) ? seat.seat_number.join(", ") : seat.seat_number}
                  </td>
                  <td className="p-3 border text-center">
                    <select
                      value={seat.isbooked ? "Booked" : "Available"}
                      onChange={(e) =>
                        updateBookedStatus(seat.id, e.target.value)
                      }
                      className="p-1 border rounded"
                    >
                      <option value="Available">Available</option>
                      <option value="Booked">Booked</option>
                    </select>
                  </td>
                  <td className="p-3 border text-center">
                    {seat.paymentStatus || "Pending"}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleDelete(seat.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
