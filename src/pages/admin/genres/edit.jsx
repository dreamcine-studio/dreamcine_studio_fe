import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenres, updateGenre } from "../../../services/genre";

export default function GenreEdit() {
  // untuk menyimpan data
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchGenreDetails = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const genres = await getGenres();
        const genre = genres.find((g) => g.id === parseInt(id));
  
        if (genre) {
          setName(genre.name);
          setDescription(genre.description);
        } else {
          setError("Genre not found");
        }
      } catch (err) {
        setError("Failed to fetch genre");
      } finally {
        setLoading(false);
      }
    };
  
    fetchGenreDetails();
  }, [id]);

  const updateGenreDetails = async (e) => {
    e.preventDefault();

    const genreData = new FormData();

    genreData.append("name", name);
    genreData.append("description", description);
    genreData.append("_method", "PUT");

    await updateGenre(id, genreData)
      .then(() => {
        navigate("/admin/genres");
      })
      .catch((err) => {
        setErrors(err.response.data.message);
      });
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
        <div className="text-2xl font-bold text-gray-500">{error} ..</div>
      </main>
    );
  }

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
