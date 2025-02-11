import { useEffect, useState } from "react";
import { deleteSeat, getSeats, updateSeat } from "../../../services/seat";
import { getStudios } from "../../../services/studios";

export default function AdminSeats() {
  const [seats, setSeats] = useState([]);
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [seatsData, studiosData] = await Promise.all([
          getSeats(),
          getStudios(),
        ]);
        setStudios(studiosData);
        setSeats(seatsData);
      } catch (error) {
        setError("Failed to fetch data, please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStudioDetails = (id) => {
    const studio = studios.find((s) => s.id === id);
    return studio || { name: "Unknown", location: "Unknown", maxseats: 0 };
  };

  const groupedSeats = seats.reduce((acc, seat) => {
    const { name, maxseats } = getStudioDetails(seat.studio_id);
    const key = `${name}`;

    if (!acc[key]) {
      acc[key] = { rows: [], maxseats };
    }
    acc[key].rows.push({
      id: seat.id,
      seatNumber: seat.seat_number,
      isBooked: seat.isbooked,
    });
    return acc;
  }, {});

  const updateBookedStatus = async (seatId, newStatus) => {
    const isBooked = newStatus === "true";
    const seat = seats.find((s) => s.id === seatId);
    if (!seat) return;

    try {
      await updateSeat(seatId, { ...seat, isbooked: isBooked, _method: "PUT" });
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
      <h1 className="text-2xl font-bold dark:text-white text-center mb-6">Seats</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto mt-6">
          <thead className="border p-1 bg-gray-50 dark:bg-gray-900 text-white">
          <tr className="bg-gray-2 dark:bg-meta-4">
              <th className="min-w-[220px] py-4 font-bold text-gray-700 dark:text-white uppercase border text-center">Studio</th>
              <th className="min-w-[220px] py-4 font-bold text-gray-700 dark:text-white uppercase border text-center">Seat Info</th>
              <th className="min-w-[220px] py-4 font-bold text-gray-700 dark:text-white uppercase border text-center">Seat Number</th>
              <th className="min-w-[220px] py-4 font-bold text-gray-700 dark:text-white uppercase border text-center">Is Booked</th>
              <th className="min-w-[220px] py-4 font-bold text-gray-700 dark:text-white uppercase border text-center min-w-[80px]">Action</th>
            </tr>
          </thead>
          <tbody className="border p-1">
            {Object.entries(groupedSeats).map(([key, data]) =>
              data.rows.map((row, index) => (
                <tr key={row.id}>
                  {index === 0 && (
                    <>
                      <td rowSpan={data.rows.length} className="px-4 py-5 font-bold text-black dark:text-white border">
                        {key.split(" | ")[0]}
                      </td>
                      <td rowSpan={data.rows.length} className="px-4 py-5 font-medium text-black dark:text-white border">
                        <span className="text-green-500 font-bold">
                          Seat Available: {data.maxseats - data.rows.length}
                        </span>
                        <br />
                        <span className="text-red-500 font-bold">
                          Seat Sold: {data.rows.length}
                        </span>
                      </td>
                    </>
                  )}
                  <td className="px-4 py-5 font-medium text-black dark:text-white border">
                    <p className="px-4">{row.seatNumber.join(", ")}</p>
                    </td>
                  <td className="px-4 py-5 border text-center">
                    <select
                      value={row.isBooked ? "true" : "false"}
                      onChange={(e) =>
                        updateBookedStatus(row.id, e.target.value)
                      }
                      className="border p-2 border-gray-300 rounded-lg dark:bg-gray-300"
                    >
                      <option value="true">Booked</option>
                      <option value="false">Available</option>
                    </select>
                  </td>
                  <td className="px-4 py-5 border text-center">
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="text-red-500"
                    >
                      {" "}
                      <i className="fa-solid fa-trash text-red-700 dark:text-red-500"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
