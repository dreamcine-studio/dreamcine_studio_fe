import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSeat } from "../../../services/seat";
import { getStudios } from "../../../services/studios";

export default function SeatCreate() {
  const [errors, setErrors] = useState({});
  const [studios, setStudios] = useState([]);
  const [seatData, setSeatData] = useState({
    studio_id: "",
    seat_number: "",
    isbooked: false, // Default boolean
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const data = await getStudios();
        setStudios(data);
      } catch (error) {
        console.error("Error fetching studios:", error);
      }
    };

    fetchStudios();
  }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setSeatData({
      ...seatData,
      [name]: type === "checkbox" ? checked : value, // Checkbox menghasilkan nilai boolean
    });
  };

  const handleCreateSeat = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("studio_id", seatData.studio_id);
    formDataToSend.append("seat_number", seatData.seat_number);
    formDataToSend.append("isbooked", seatData.isbooked); // Kirim sebagai boolean

    try {
      await createSeat(formDataToSend);
      navigate("/admin/seats");
    } catch (err) {
      console.log(err.response?.data?.message);
      setErrors(err.response?.data?.message || {});
    }
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Create Seat</h3>
        </div>
        <form onSubmit={handleCreateSeat} className="py-5">
          <div className="p-6.5 flex flex-col gap-5">
            {/* Studio Selection */}
            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                Studio
              </label>
              {errors.studio_id && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.studio_id[0]}</span>
                </div>
              )}
              <select
                name="studio_id"
                onChange={handleInputChange}
                value={seatData.studio_id}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-indigo-600 active:border-indigo-600"
              >
                <option value="">-- Select Studio --</option>
                {studios.map((studio) => (
                  <option key={studio.id} value={studio.id}>
                    {studio.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Seat Number */}
            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                Seat Number
              </label>
              {errors.seat_number && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.seat_number[0]}</span>
                </div>
              )}
              <input
                type="text"
                name="seat_number"
                value={seatData.seat_number}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-indigo-600 active:border-indigo-600"
              />
            </div>

            {/* Is Booked (Checkbox) */}
            <div className="mb-4.5 flex items-center gap-3">
  <select
    name="isbooked"
    value={seatData.isbooked}
    onChange={handleInputChange}
    className="h-10 w-20 rounded border-stroke bg-transparent text-black dark:text-white focus:ring-indigo-600"
  >
    <option value="1">1</option>
    <option value="2">2</option>
  </select>
  <label className="text-base font-medium text-black dark:text-white">
    Is Booked
  </label>
</div>


            {/* Submit Button */}
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
