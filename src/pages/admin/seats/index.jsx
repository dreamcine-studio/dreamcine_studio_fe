import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteSeat, getSeats } from "../../../services/seat";
import { getStudios } from "../../../services/studios";

export default function AdminSeats() {
  // const [seats, setSeats] = useState([]);
  // const [studios, setStudios] = useState([]);

  // useEffect(() => {
  //   const fetchSeats = async () => {
  //     const data = await getSeats();
  //     setSeats(data);
  //   };


  //   const fetchStudios = async () => {
  //     const data = await getStudios();
  //     setStudios(data);
  //   };

  //   fetchStudios();
  //   fetchSeats();
  // }, []);

  const [seats, setSeats] = useState([]);
  const [studios, setStudios] = useState([]);
  const [Loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

useEffect(() => {
  
const fetchData = async () => {
  setLoading(true);
  setError(null);

  try {
    const [
      seatsData,
      studiosData,
    ] = await Promise.all( [
      getSeats(),
      getStudios(),
    ]);

    setStudios(studiosData);
    setSeats(seatsData);
    }catch (error){
      setError("Failed to fetch data, please try again later : ")
      console.log(error);

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
  

  // console.log(seats);

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
      <div>
        <h1 className="text-2xl font-bold mb-4">Seats</h1>
      </div>
      <Link
        to={"/admin/seats/create"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <i className="fa-solid fa-plus mr-2"></i>
        Add Data
      </Link>

      <div className="max-w-full overflow-x-auto mt-4">
        <table className="w-full table-auto">
          <thead className="border-b bg-gray-50 text-white">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black xl:pl-11">
                Studio id
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Seat Number
              </th>

              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Is Booked
              </th>

              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {seats.length > 0 ? (
              seats.map((seat) => (
                <tr key={seat.id} className="hover:bg-gray-50">
                  <td className="px-4 py-5 pl-9 xl:pl-11">
                    <h5 className="font-medium text-black">
                      {getStudioName(seat.studio_id)}
                    </h5>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black">
                      {seat.seat_number.join(", ")}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-indigo-800">
                    {Boolean(seat.isbooked).toString()}
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