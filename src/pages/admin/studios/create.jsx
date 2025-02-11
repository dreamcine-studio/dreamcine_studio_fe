import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudio } from "../../../services/studios";
import Error from "../../../components/Error";

export default function StudioCreate() {
  const [errors, setErrors] = useState({});

  const [studioData, setGenreData] = useState({
    name: "",
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
    <div className="flex flex-col gap-9 min-h-screen">
      <div className="rounded-sm shadow-default dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="text-xl font-semibold text-black dark:text-white uppercase">
            Add Studio Data
          </h3>
        </div>
        <form onSubmit={studioGenre} className="py-5">
          <div className="p-6.5 flex flex-col gap-5">
            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                Name
              </label>
             {errors.name && (
                <Error res={errors.name[0]} />
               )}
                            
              <input
                placeholder="Masukkan Nama Studio"
                type="text"
                name="name"
                value={studioData.name}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-blue-600 active:border-blue-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-blue-600"
              />
            </div>


            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                Max Seat
              </label>
              {errors.maxseats && (
                <Error res={errors.maxseats[0]} />
               )}



              <input
                type="number"
                placeholder="Masukkan Max-Seat Studio"
                name="maxseats"
                min={1}
                value={studioData.maxseats}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-blue-600 active:border-blue-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-blue-600 dark:text-white"
              ></input>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-blue-600 p-3 font-medium text-white hover:bg-opacity-90"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
