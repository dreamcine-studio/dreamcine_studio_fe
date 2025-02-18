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

        const groupedSeats = updatedSeats.reduce((acc, seat) => {
          const key = `${seat.schedule_showtime_id}-${seat.showdate}`;

          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(seat); 

          return acc;
        }, {});

        setSeats(Object.values(groupedSeats).flat());

        setStudios(studiosData);
        setMovies(movieData);
        setSeats(updatedSeats);
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
        <div className="text-2xl font-bold text-gray-500">{error} ..</div>
      </main>
    );
  }


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

              const filteredSeats = seats.filter(
                (seat) => seat.schedule_showtime_id === scheduleShowtime.id
              );

              return filteredSeats.map((seat, index) => (
                <tr
                  key={`${scheduleShowtime.id}-${seat.id}`}
                  className="border"
                >
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
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
