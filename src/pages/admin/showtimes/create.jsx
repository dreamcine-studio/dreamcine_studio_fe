import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createShowtimes } from "../../../services/showtime";

export default function ShowtimeCreate() {
  const [errors, setErrors] = useState({});

  const [showtimeData, setShowtimeData] = useState({
    sequence: "",
  });

  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShowtimeData({ ...showtimeData, [name]: value });
  };

  const createShowtime = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("sequence", showtimeData.sequence);

    try {
      await createShowtimes(formDataToSend);
      navigate("/admin/showtimes");
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-9 min-h-screen">
      <div className="rounded-sm shadow-default dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Add Showtime Data
          </h3>
        </div>
        <form onSubmit={createShowtime} className="py-5">
          <div className="p-6.5 flex flex-col gap-5">
            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                Sequence
              </label>
                            
              <input
                type="time"
                name="sequence"
                value={showtimeData.sequence}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-blue-600 active:border-blue-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-blue-600"
              />
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
