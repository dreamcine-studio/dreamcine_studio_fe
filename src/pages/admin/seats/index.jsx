import { useEffect, useState } from "react";
import { deleteSeat, getSeats, updateSeat } from "../../../services/seat";
import { getStudios } from "../../../services/studios";
import { getSchedules } from "../../../services/schedules";
import { getScheduleShowtimes } from "../../../services/scheduleshowtime";
import { getMovies } from "../../../services/movies";
import { getShowtimes } from "../../../services/showtime";

export default function AdminSeats() {
  const [seats, setSeats] = useState([]);
  const [studios, setStudios] = useState([]);
  const [movies, setMovies] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [schedulesShowtimes, setSchedulesShowtimes] = useState([]);
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
        ] = await Promise.all([
          getSeats(),
          getMovies(),
          getStudios(),
          getSchedules(),
          getShowtimes(),
          getScheduleShowtimes(),
        ]);
        setStudios(studiosData);
        setMovies(movieData);
        setSeats(seatsData);
        setSchedules(schedulesData);
        setShowtimes(showtimesData);
        setSchedulesShowtimes(scheduleShowtimesData);
      } catch (error) {
        setError("Failed to fetch data, please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateBookedStatus = async (seatId, newStatus) => {
    const isBooked = newStatus === "true";
    try {
      // Ambil seat yang sedang diupdate
      const seatToUpdate = seats.find((s) => s.id === seatId);
      if (!seatToUpdate) {
        console.error("Seat not found");
        return;
      }
  
      // Kirim request update ke API
      await updateSeat(seatId, {
        schedule_showtime_id: seatToUpdate.schedule_showtime_id,
        seat_number: seatToUpdate.seat_number,
        isbooked: isBooked,
        _method: "PUT",
      });
  
      // Update state seats setelah sukses
      setSeats((prevSeats) =>
        prevSeats.map((s) =>
          s.id === seatId ? { ...s, isbooked: isBooked } : s
        )
      );
    } catch (error) {
      console.error("Update failed:", error);
    }
  };
  
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
        Seats Management
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto mt-6 border-collapse border border-gray-300">
          <thead className="bg-gray-200 dark:bg-gray-800 text-white">
            <tr>
              <th className="p-3 border">Studio</th>
              <th className="p-3 border">Movie</th>
              <th className="p-3 border">Showtime</th>
              <th className="p-3 border">MaxSeats</th>
              <th className="p-3 border">Available</th>
              <th className="p-3 border">Seat Number</th>
              <th className="p-3 border">Is Booked</th>
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

              const filteredSeats = seats.filter(
                (seat) => seat.schedule_showtime_id === scheduleShowtime.id
              );

              return filteredSeats.map((seat, index) => (
                <tr key={seat.id} className="border">
                  {index === 0 && (
                    <>
                      <td rowSpan={filteredSeats.length} className="p-3 border dark:text-white">
                        {studio.name}
                      </td>
                      <td rowSpan={filteredSeats.length} className="p-3 border dark:text-white">
                        {movie.title}
                      </td>
                      <td
                        rowSpan={filteredSeats.length}
                        className="px-2 py-4 border dark:text-white text-center"
                      >
                        {showtime.sequence.slice(0, 5)}
                      </td>
                    </>
                  )}
              
                <td className="p-3 border text-center">
                    <p className="text-black dark:text-white">{studio.maxseats}</p>
                  </td>

                  <td className="p-3 border text-center">
                    tes
                  </td >
                  <td className="p-3 border dark:text-white text-center">
                    {seat.seat_number.join(", ")}
                  </td>
                  <td className="p-3 border text-center">
                    <select
                      value={seat.isbooked ? "true" : "false"}
                      onChange={(e) =>
                        updateBookedStatus(seat.id, e.target.value)
                      }
                      className="border p-2 rounded-md"
                    >
                      <option value="true">Booked</option>
                      <option value="false">Available</option>
                    </select>
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleDelete(seat.id)}
                      className="text-red-500 hover:text-red-700"
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
