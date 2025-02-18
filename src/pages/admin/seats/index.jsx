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
        const updatedSeats = await Promise.all(seatsData.map(async (seat) => {
          const payment = paymentDatas.find(
            (p) => p.booking_id === seat.id // Match payment booking_id with seat.id
          );
          const booking = bookingDatas.find(b => b.id === seat.booking_id); // Find the booking
        
          let isBooked = seat.isbooked; // Initialize with the original value
          if (payment) {
            if (payment.status === "failed") {
              isBooked = 0; // If payment failed, set isbooked to 0
            } else if (booking && (payment.status === "confirmed" || payment.status === "pending")) {
              isBooked = 1; // If payment is confirmed or pending, set isbooked to 1
            }
          }
        
          // Update the seat status in the backend
          if (seat.isbooked !== isBooked) {
            try {
              // Call updateSeat API with PUT method using _method
              await updateSeat(seat.id, {
                _method: 'PUT',  // Add _method to emulate PUT request
                isbooked: isBooked,
                schedule_showtime_id: seat.schedule_showtime_id, // Add schedule_showtime_id
                seat_number: seat.seat_number, // Add seat_number
                showdate: seat.showdate, // Add showdate
              });
            } catch (error) {
              console.error("Failed to update seat:", error);
            }
          }
        
          return {
            ...seat,
            paymentStatus: payment ? payment.status : "pending",
            isbooked: isBooked, // Update isbooked based on payment status
          };
        }));
        
        setSeats(updatedSeats);  // Update state with new seats data
        
  
        setStudios(studiosData);
        setMovies(movieData);
        setSeats(updatedSeats);  // Updated seats with payment status
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
          <thead className="bg-gray-200 dark:bg-gray-800 text-white">
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
            {schedulesShowtimes.map((scheduleShowtime) => {
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

              const groupedSeats = seats
                .filter(
                  (seat) => seat.schedule_showtime_id === scheduleShowtime.id
                )
                .reduce((acc, seat) => {
                  if (!acc[seat.showdate]) {
                    acc[seat.showdate] = {
                      seatNumbers: [],
                      isBooked: seat.isbooked,
                    };
                  }
                  acc[seat.showdate].seatNumbers.push(...seat.seat_number);
                  return acc;
                }, {});

              return Object.entries(groupedSeats).map(
                ([showdate, seatData], index) => (
                  <tr key={showdate} className="border">
                    {index === 0 && (
                      <>
                        <td
                          rowSpan={Object.keys(groupedSeats).length}
                          className="p-3 border dark:text-white"
                        >
                          {studio.name}
                        </td>
                        <td
                          rowSpan={Object.keys(groupedSeats).length}
                          className="p-3 border dark:text-white"
                        >
                          {movie.title}
                        </td>
                        <td
                          rowSpan={Object.keys(groupedSeats).length}
                          className="px-2 py-4 border dark:text-white text-center"
                        >
                          {showtime.sequence.slice(0, 5)}
                        </td>
                      </>
                    )}
                    <td className="px-2 border dark:text-white text-center">
                      {showdate}
                    </td>
                    <td className="p-3 border dark:text-white text-center">
                      {seatData.seatNumbers.join(", ")}
                    </td>
                    <td className="p-3 border text-center">
                    <select
  value={seatData.isBooked ? "Booked" : "Available"}
  onChange={(e) => {
    const selectedSeat = seats.find(
      (seat) =>
        seat.schedule_showtime_id === scheduleShowtime.id &&
        seat.showdate === showdate &&
        seat.seat_number.some((sn) => seatData.seatNumbers.includes(sn))
    );
    
    if (selectedSeat) {
      updateBookedStatus(selectedSeat.id, e.target.value); // Pass the correct seat ID and status
    }
  }}
  className="p-1 border rounded"
>
  <option value="Available">Available</option>
  <option value="Booked">Booked</option>
</select>

</td>

                    <td className="p-3 border text-center">
                      {seats.find(
                        (seat) =>
                          seat.schedule_showtime_id === scheduleShowtime.id &&
                          seat.showdate === showdate
                      )?.paymentStatus || "Pending"}
                    </td>
                    <td className="p-3 border text-center">
                     
                      <button
                        onClick={() => handleDelete(scheduleShowtime.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
