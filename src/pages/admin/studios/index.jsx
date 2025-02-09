import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { deleteStudio, getStudios } from "../../../services/studios";

export default function AdminStudios() {
  // const [studios, setStudios] = useState([]);

  // useEffect(() => {
  //   const fetchStudios = async () => {
  //     const data = await getStudios();
  //     setStudios(data);
  //   };

  //   fetchStudios();
  // }, []);

  const [studios, setStudios] = useState([]);
  const [Loading, setLoading] = useState([]);
  const [error, setError] = useState([]);
useEffect(() => {
  
const fetchData = async () => {
  setLoading(true);
  setError(null);

  try {
    const [
      studiosData,
    ] = await Promise.all( [
      getStudios(),

    ]);

    setStudios(studiosData);
  
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




  console.log("tes", studios);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin Menghapus Data ini ?"
    );

    if (confirmDelete) {
      await deleteStudio(id);

      setStudios(studios.filter((studio) => studio.id !== id));
    }
  };

  return (
    <div className="space-y-2 min-h-screen w-full rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1">
       <div className="flex items-center gap-6 justify-start">
        <h1 className="text-2xl text-center font-bold dark:text-white">Studios</h1>
        <Link
        to={"/admin/studios/create"}
        className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        <i className="fa-solid fa-plus mr-2"></i>
        Add Data
      </Link>
      </div>

      <div className="max-w-full overflow-x-auto mt-4">
        <table className="w-full table-auto mt-6">
          <thead className="border-b bg-gray-50 dark:bg-gray-900 text-white">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-bold text-gray-700 xl:pl-11 dark:text-white uppercase">
                Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                Location
              </th>

              <th className="min-w-[150px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                Max Seat
              </th>

              <th className="min-w-[150px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {studios.length > 0 ? (
              studios.map((studio) => (
                <tr key={studio.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-4 py-5 pl-9 xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {studio.name}
                    </h5>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {studio.location}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {studio.maxseats}
                    </p>
                  </td>

                  <td className="px-4 py-5">
                    <div className="flex items-center space-x-3.5">
                      <Link to={`/admin/studios/edit/${studio.id}`}>
                        <i className="fa-solid fa-pen-to-square text-yellow-500"></i>
                      </Link>
                      <button onClick={() => handleDelete(studio.id)}>
                        <i className="fa-solid fa-trash text-red-700 dark:text-red-500"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p>Tidak ada data Studio</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
