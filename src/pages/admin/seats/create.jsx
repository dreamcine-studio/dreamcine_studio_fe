import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSeat } from "../../../services/seat";

export default function SeatCreate() {
  const [errors, setErrors] = useState({});

  const [seatData, setseatData] = useState({
    studio_id: "",
    seat_number: "",
    isbooked: "",
  });

  const navigate = useNavigate();

  // di sini kita kasih Handle
  // Handle input change
  const handleInputChange = (event) => {
    // ini kita destructoring, name adalah properti di HTML, value tempat ngirim data ke server
    // kalau di Postmane itu nama nya Key
    // value itu di Postman itu value juga
    const { name, value } = event.target;
    setseatData({ ...seatData, [name]: value });
  };

  const studioSeat = async (e) => {
    e.preventDefault();

    // ini nama objec nya, bebas, berfungsi untuk menambahkan data
    const formDataToSendSeat = new FormData();

    formDataToSendSeat.append("studio_id", seatData.studio_id);
    formDataToSendSeat.append("seat_number", seatData.seat_number);
    formDataToSendSeat.append("isbooked", seatData.isbooked);

    // biar lebih bagus kita bisa pakai try catch
    try {
      await createSeat(formDataToSendSeat);
      navigate("/admin/seats");
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  console.log(seatData);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Create seat
          </h3>
        </div>
        <form onSubmit={studioSeat} className="py-5">
          <div className="p-6.5 flex flex-col gap-5">
            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                studio
              </label>
              {errors.name && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.studio_id[0]}</span>
                </div>
              )}

              <input
                type="text"
                name="studio_id"
                value={seatData.studio_id}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                seat_number
              </label>
              {errors.seat_Number && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.seat_Number[0]}</span>
                </div>
              )}

              <input
                type="text"
                name="seat_number"
                value={seatData.seat_number}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                is booked
              </label>
              {errors.isbooked && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.isbooked[0]}</span>
                </div>
              )}

              <textarea
                rows="6"
                name="isbooked"
                value={seatData.isbooked}
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
