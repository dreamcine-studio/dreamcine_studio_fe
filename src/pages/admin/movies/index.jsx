import { Link } from "react-router-dom";
// import movies from "../../../utils/constants/Movies"
import { useEffect, useState } from "react";
import { deleteMovie, getMovies } from "../../../services/movies";
import { getGenres } from "../../../services/genre";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies();
      setMovies(data);
    };

    const fetchGenres = async () => {
      const data = await getGenres();
      setGenres(data);
    };

    fetchMovies();
    fetchGenres();
  }, []);

  console.log("tesm", movies);
  console.log("tesg", genres);

  const getGenreName = (id) => {
    const genre = genres.find((g) => g.id === id);
    return genre ? genre.name : "Uknown Genre";
  };

  const handleDelete = async (id) => {
    const confirmdelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );

    if (confirmdelete) {
      await deleteMovie(id);
      setMovies(movies.filter((movie) => movie.id !== id));
      alert("Data berhasil di hapus");
    }
  };

  return (
    <div className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Link
        to={"/admin/movies/create"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Tambah data
      </Link>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="border-b bg-gray-50 text-white">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className=" px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Title
              </th>
              <th className=" px-4 py-4 font-medium text-black dark:text-white">
                Description
              </th>
              <th className=" px-4 py-4 font-medium text-black dark:text-white">
                Poster
              </th>
              <th className=" px-4 py-4 font-medium text-black dark:text-white">
                Price
              </th>
              <th className=" px-4 py-4 font-medium text-black dark:text-white">
                Cast
              </th>
              <th className=" px-4 py-4 font-medium text-black dark:text-white">
                Genre
              </th>
              <th className=" px-4 py-4 font-medium text-black dark:text-white">
                Duration
              </th>
              <th className=" px-4 py-4 font-medium text-black dark:text-white">
                Release_date
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <tr key={movie.id} className="hover:bg-gray-50">
                  <td className="px-4 py-5 pl-9 xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {movie.title}
                    </h5>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {movie.description}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <img
                      src={`http://127.0.0.1:8000/storage/movies/${movie.poster}`}
                    />
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">{movie.price}</p>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">{movie.cast}</p>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {getGenreName(movie.genre_id)}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {movie.duration}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {movie.release_date}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center space-x-3.5">
                      <Link to={`/admin/movies/edit/${movie.id}`}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button onClick={() => handleDelete(movie.id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p>Tidak ada data movie</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
