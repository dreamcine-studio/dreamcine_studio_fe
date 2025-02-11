import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenres, updateGenre } from "../../../services/genre";

export default function UserEdit() {
  // menanpilkan error
  const [errors, setErrors] = useState({});

  // ini dari masing masing,
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // destruct id dari URL
  const { id } = useParams();

  const navigate = useNavigate();

  // kita coba fetch data buku berdasarkan ID
  const fetchGenreDetails = async () => {
    // dari sini kita ambil data nya dari sevices getBooks

    // getBooks ini kita masukan ke dalam variable nama nya data
    const data = await getGenres(); // getBooks() mengambil semua data buku

    // kita coba, cari data buku berdasarkan id
    const genre = data.find((book) => book.id === parseInt(id));
    // console.log(book)
    if (genre) {
      // assign data to state (ini setter function  nya yang di pakai)
      setName(genre.name); // ini format nya object json pakai titik
      setDescription(genre.description);
    }
  };



  useEffect(() => {
    fetchGenreDetails();
  }, []);

  const updateGenreDetails = async (e) => {
    e.preventDefault();



    // buat FormData
    const genreData = new FormData();


    genreData.append("name", name);
    genreData.append("description", description);

    // ini kita tambahkan _method    put
    genreData.append("_method", "PUT");


    // ini updateBook ambil dari service books.js
    await updateGenre(id, genreData)
      // jika berhasil kita mau apa, kita pindah pakai navigate
      .then(() => {
        //berhasil, kita redirect ke halaman index.
        navigate("/admin/genres");
        // console.log(genreData)
      })
      .catch((err) => {
        setErrors(err.response.data.message);
      });
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm bg-white dark:bg-gray-700 min-h-screen shadow-default dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-bold uppercase text-black dark:text-white">
            Edit Genre Data
          </h3>
        </div>
        <form onSubmit={updateGenreDetails} className="py-5">
          <div className="p-6.5 flex flex-col gap-5">
            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                Name
              </label>

              {errors.name && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.name[0]}</span>
                </div>
              )}
              <input
                type="text"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-blue-600 active:border-blue-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-blue-600 dark:text-white"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                Description
              </label>

              {errors.description && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.description[0]}</span>
                </div>
              )}

              <textarea
                rows="6"
                value={description}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-blue-600 active:border-blue-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-blue-600 dark:text-white"
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-blue-600 p-3 font-medium text-white hover:bg-opacity-90"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
