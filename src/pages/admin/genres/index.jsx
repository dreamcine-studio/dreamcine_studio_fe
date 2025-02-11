import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteGenre, getGenres } from "../../../services/genre";

export default function AdminGenres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); 
  const [deleteError, setDeleteError] = useState(null); 
  const location = useLocation(); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const genresData = await getGenres();
        setGenres(genresData);
      } catch (error) {
        setError("Failed to fetch data, please try again later.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
    }
  }, [location]);

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

  const handleDelete = (id) => {
    setGenreToDelete(id);
    setIsModalOpen(true); 
  };

  const confirmDelete = async () => {
    if (genreToDelete) {
      try {
        await deleteGenre(genreToDelete);
        setGenres(genres.filter((genre) => genre.id !== genreToDelete)); 
        setSuccessMessage("Genre successfully deleted!"); 
        setIsModalOpen(false); 
        setGenreToDelete(null);

        setTimeout(() => {
          setSuccessMessage(""); 
        }, 3000);
      } catch (error) {
        setDeleteError("Failed to delete the genre, please try again later.");
        console.log(error);
      }
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setGenreToDelete(null);
    setDeleteError(null); 
  };

  return (
    <div className="space-y-2 min-h-screen w-full rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex items-center gap-6 justify-start">
        <h1 className="text-2xl text-center font-bold dark:text-white">Genres</h1>
        <Link
          to={"/admin/genres/create"}
          className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          <i className="fa-solid fa-plus mr-2"></i>
          Add Data
        </Link>
      </div>

      {/* Pesan Sukses setelah Penghapusan */}
      {successMessage && (
        <div className="bg-green-500 text-white p-4 rounded-md text-center">
          {successMessage}
        </div>
      )}

      <div className="max-w-full overflow-x-auto mt-4">
        <table className="w-full table-auto mt-6">
          <thead className="border-b bg-gray-50 dark:bg-gray-900 text-white">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] px-4 py-4 font-bold text-gray-700 dark:text-white xl:pl-11 uppercase">
                Name
              </th>
              <th className="min-w-[220px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                Description
              </th>
              <th className="min-w-[220px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {genres.length > 0 ? (
              genres.map((genre) => (
                <tr key={genre.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-4 py-5 pl-9 xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {genre.name}
                    </h5>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">{genre.description}</p>
                  </td>

                  <td className="px-4 py-5">
                    <div className="flex items-center space-x-3.5">
                      <Link to={`/admin/genres/edit/${genre.id}`}>
                        <i className="fa-solid fa-pen-to-square text-yellow-500"></i>
                      </Link>
                      <button onClick={() => handleDelete(genre.id)}>
                        <i className="fa-solid fa-trash text-red-700 dark:text-red-500"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p>Tidak ada data Genre</p>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Konfirmasi Penghapusan */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3 text-center">
            <h3 className="text-xl font-semibold text-black mb-4">Are you sure Delete ?</h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                No
              </button>
            </div>
            {deleteError && (
              <div className="mt-4 text-red-500">
                {deleteError}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}