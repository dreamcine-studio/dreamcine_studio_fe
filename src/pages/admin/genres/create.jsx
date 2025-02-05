// import { useState } from "react"
// import { createGenre } from "../../../services/genres";
// import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGenre } from "../../../services/genre";

export default function GenreCreate() {
  const [errors, setErrors] = useState({});

  const [genreData, setGenreData] = useState({
    name: "",
    description: "",
  });

  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGenreData({ ...genreData, [name]: value });
  };

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
              {errors.name && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.name[0]}</span>
                </div>
              )}
              <input
              placeholder="Masukkan nama"
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
              {errors.description && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.description[0]}</span>
                </div>
              )}

              <textarea
                placeholder="Masukkan description"
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
