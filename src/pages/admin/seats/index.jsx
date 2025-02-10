import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStudioDetails = (id) => {
    const studio = studios.find((g) => g.id === id);
    return studio
      ? {
          name: studio.name,
          location: studio.location,
          maxSeats: studio.maxseats,
        }
      : { name: "Unknown", location: "Unknown", maxSeats: 0 };
  };


  const updateBookedStatus = async (e, id) => {
    e.preventDefault();
  
    const isbooked = e.target.value === "true"; // Convert to boolean
    const seat = seats.find(seat => seat.id === id); // Find the correct seat by ID
  
    const seatData = {
      studio_id: seat.studio_id, // Use the studio_id from the specific seat
      seat_number: seat.seat_number, // Use the seat_number from the specific seat
      isbooked: isbooked,
      _method: "PUT",
    };
  
    try {
      const response = await updateSeat(id, seatData); // Send as JSON
      console.log("Response:", response.data);
  
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === id ? { ...seat, isbooked } : seat
        )
      );
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  
    console.log(seatData); // Log the seatData to see the structure
  };
  

  if (loading) {
    return (
      <main className="py-6 px-12 space-y-2 bg-gray-300 min-h-screen w-full flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 border-4 border-solid border-transparent rounded-full animate-spin border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-pink-500"></div>
          <div className="text-2xl font-bold text-gray-800 animate-bounce">
            Please Wait ..
          </div>
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
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (confirmDelete) {
      await deleteSeat(id);
      setSeats(seats.filter((seat) => seat.id !== id));
    }
  };

  return (
    <div className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1 min-h-screen">
      <div>
        <h1 className="text-2xl text-center font-bold dark:text-white">
          Seats
        </h1>
      </div>
      {/* <Link
        to={"/admin/seats/create"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <i className="fa-solid fa-plus mr-2"></i>
        Add Data
      </Link> */}

      <div className="max-w-full overflow-x-auto mt-4">
        <table className="w-full table-auto">
          <thead className="border-b bg-gray-50 dark:bg-gray-900 text-white">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase border dark:border-gray-500">
                Studio
              </th>
              <th className="min-w-[150px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase border dark:border-gray-500">
                Location
              </th>
              <th className="min-w-[150px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase border dark:border-gray-500">
                Seat Info
              </th>
              <th className="min-w-[150px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase border dark:border-gray-500">
                Seat Numbers
              </th>
              <th className="min-w-[150px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase border dark:border-gray-500">
                Is Booked
              </th>
              <th className="min-w-[150px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase border dark:border-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {seats.map((seat) => {
              const studioDetails = getStudioDetails(seat.studio_id);
              const seatSold = seat.seat_number.length;
              const seatAvailable = studioDetails.maxSeats - seatSold;
              return (
                <tr key={seat.id}>
                  <td className="px-4 py-5 font-medium text-black dark:text-white border dark:border-gray-500">
                    {studioDetails.name}
                  </td>
                  <td className="px-4 py-5 text-black dark:text-white border dark:border-gray-500">
                    {studioDetails.location}
                  </td>
                  <td className="px-4 py-5 text-black dark:text-white border dark:border-gray-500">
                    <span className="text-green-500 font-bold">
                    Seat Available: {seatAvailable}
                    </span>
                    <br />
                    <span className="text-red-500 font-bold">
                      Seat Sold: {seatSold}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-black dark:text-white font-bold border dark:border-gray-500">
                    {seat.seat_number.join(", ")}
                  </td>
                  <td className="px-4 py-5 border dark:border-gray-500">
                    <select
                      value={seat.isbooked ? "true" : "false"}
                      onChange={(e) => updateBookedStatus(e, seat.id)}
                      className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-2 py-1 mr-2 rounded border dark:border-gray-500 text-sm"
                    >
                      <option value="true">Booked</option>
                      <option value="false">Available</option>
                    </select>
                  </td>
                  <td className="px-4 py-5 border dark:border-gray-500">
                    <button onClick={() => handleDelete(seat.id)}>
                      <i className="fa-solid fa-trash text-red-700 dark:text-red-500"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
