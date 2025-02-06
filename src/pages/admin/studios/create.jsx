import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudio } from "../../../services/studios";

export default function StudioCreate() {
  const [errors, setErrors] = useState({});

  const [studioData, setGenreData] = useState({
    name: "",
    location: "",
    maxseats: "",
  });

  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGenreData({ ...studioData, [name]: value });
  };

  const studioGenre = async (e) => {
    e.preventDefault();

    const formDataToSendGenre = new FormData();

    formDataToSendGenre.append("name", studioData.name);
    formDataToSendGenre.append("location", studioData.location);
    formDataToSendGenre.append("maxseats", studioData.maxseats);

    try {
      await createStudio(formDataToSendGenre);
      navigate("/admin/studios");
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  console.log(studioData);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black">
            Create Studios
          </h3>
        </div>
        <form onSubmit={studioGenre} className="py-5">
          <div className="p-6.5 flex flex-col gap-5">
            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black">
                Name
              </label>
              {errors.name && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.name[0]}</span>
                </div>
              )}

              <input
                placeholder="Masukkan Nama Studio"
                type="text"
                name="name"
                value={studioData.name}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-indigo-600"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black">
                Location
              </label>
              {errors.location && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.location[0]}</span>
                </div>
              )}

              <input
                placeholder="Masukkan Lokasi Studio"
                type="text"
                name="location"
                value={studioData.location}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-indigo-600"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black">
                Max Seat
              </label>
              {errors.maxseats && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.maxseats[0]}</span>
                </div>
              )}

              <textarea
                placeholder="Masukkan Max-Seat Studio"
                rows="6"
                name="maxseats"
                value={studioData.maxseats}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-indigo-600"
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
