import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getShowtimes, updateShowtimes } from "../../../services/showtime";

export default function ShowtimeEdit() {
  const [errors, setErrors] = useState({});
  const [sequence, setSequence] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const data = await getShowtimes();
        const showtimeData = data.find((sc) => sc.id === parseInt(id));
        if (showtimeData) {
          setSequence(showtimeData.sequence); // Set sequence dari data showtime
        }
      } catch (error) {
        setErrors({ message: "Failed to fetch data, please try again later." });
        console.log(error);
      }
    };

    fetchShowtimes();
  }, [id]);

  const updateShowtimeDetails = async (e) => {
    e.preventDefault();

    // Mengupdate showtime dengan sequence baru
    const showtimeData = new FormData();
    showtimeData.append("sequence", sequence);
    showtimeData.append("_method", "PUT");

    try {
      await updateShowtimes(id, showtimeData);
      navigate("/admin/showtimes");
    } catch (err) {
      setErrors({ message: err.response?.data?.message || "An error occurred" });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-full max-w-[800px] justify-center p-5">
        <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Edit Showtime</h3>
          </div>
          <form onSubmit={updateShowtimeDetails} className="py-5">
            <div className="p-6.5 flex flex-col gap-5">
              {errors.message && (
                <div className="text-red-500 text-sm">{errors.message}</div>
              )}
              <div className="mb-4.5">
                <label className="mb-3 block text-base font-medium text-black dark:text-white">
                  Sequence
                </label>
                <input
                  type="time"
                  name="sequence"
                  value={sequence}
                  onChange={(e) => setSequence(e.target.value)} // update sequence
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
                />
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
    </div>
  );
}
