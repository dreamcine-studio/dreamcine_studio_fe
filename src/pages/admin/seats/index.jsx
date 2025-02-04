import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteSeat, getSeats } from "../../../services/seat";
import { getStudios } from "../../../services/studios";

export default function AdminSeats() {
  const [seats, setSeats] = useState([]);
  const [studios, setStudios] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      const data = await getSeats();
      setSeats(data);
    };

    const fetchStudios = async () => {
      const data = await getStudios();
      setStudios(data);
    };

    fetchStudios();
    fetchSeats();
  }, []);

  console.log(seats);

  const getStudioName = (id) => {
    const studio = studios.find((g) => g.id === id);
    return studio ? studio.name : "Unknown studio";
  };

  const handleDelete = async (id) => {
    // deleteBook dari services jangan lupa di inport
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin Menghapus Data ini ?"
    );

    if (confirmDelete) {
      await deleteSeat(id);

      // ini kita update pakai setter Books
      setSeats(seats.filter((seat) => seat.id !== id));
    }
  };

  return (
    <div className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Link
        to={"/admin/seats/create"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Tambah data
      </Link>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="border-b bg-gray-50 text-white">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Studio id
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Seat Number
              </th>

              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Is Booked
              </th>

              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {seats.length > 0 ? (
              seats.map((seat) => (
                <tr key={seat.id} className="hover:bg-gray-50">
                  <td className="px-4 py-5 pl-9 xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {getStudioName(seat.studio_id)}
                    </h5>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {seat.seat_number}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {seat.isbooked}
                    </p>
                  </td>

                  <td className="px-4 py-5">
                    <div className="flex items-center space-x-3.5">
                      <Link to="">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button onClick={() => handleDelete(seat.id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p>Tidak ada data Seats</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
