import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGenre } from "../../../services/genre";
import Error from "../../../components/Error";

export default function GenreCreate() {
  // untuk menampung data
  const [genreData, setGenreData] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // untuk handle input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGenreData({ ...genreData, [name]: value });
  };

  // untuk mengirim data
  const storeGenre = async (e) => {
    e.preventDefault();
    const formDataToSendGenre = new FormData();

    formDataToSendGenre.append("name", genreData.name);
    formDataToSendGenre.append("description", genreData.description);

    try {
      await createGenre(formDataToSendGenre);
      navigate("/admin/genres");
    } catch (error) {
      setErrors(error.response.data.message);
    }
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

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Data Genres
          </h3>
        </div>
        <form onSubmit={storeGenre} className="py-5">
          <div className="p-6.5 flex flex-col gap-5">
            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                Name
              </label>
              {errors.name && <Error res={errors.name[0]} />}

              <input
                type="text"
                name="name"
                value={genreData.name}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                Description
              </label>
              {errors.description && <Error res={errors.description[0]} />}

              <textarea
                rows="6"
                name="description"
                value={genreData.description}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-indigo-600 p-3 font-medium text-white hover:bg-opacity-90"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
