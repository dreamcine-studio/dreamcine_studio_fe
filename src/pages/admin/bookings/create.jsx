import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../../services/booking";

export default function BookingCreate() {
  const [errors, setErrors] = useState({});

  const [bookingData, setBookingData] = useState({
    user_id: "",
    schedule_id: "",
    quantity: "",
    booking_date: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  //Handle submit
  const storeBooking = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("user_id", bookingData.user_id);
    formDataToSend.append("schedule_id", bookingData.schedule_id);
    formDataToSend.append("quantity", bookingData.quantity);
    formDataToSend.append("booking_date", bookingData.booking_date);

    try {
      await createBooking(formDataToSend);
      return navigate("/admin/bookings");
    } catch (err) {
      // console.log(err.response.data.message)
      setErrors(err.response.data.message);
    }
  };

  console.log(bookingData);

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Data booking
          </h3>
        </div>
        <form onSubmit={storeBooking} className="py-5">
          <div className="p-6.5 flex flex-col gap-5">
            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                user_id
              </label>
              {errors.user_id && (
                <div
                  className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">{errors.user_id[0]}</span>
                </div>
              )}
              <input
                type="text"
                value={bookingData.user_id}
                onChange={handleInputChange}
                name="user_id"
                // bookData itu adalah useState yang di atas

                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                schedule_id
              </label>
              {errors.schedule_id && (
                <div
                  className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">{errors.schedule_id[0]}</span>
                </div>
              )}
              <input
                name="schedule_id"
                value={bookingData.schedule_id}
                onChange={handleInputChange}
                // bookData itu adalah useState yang di atas
                rows="6"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              ></input>
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                quantity
              </label>
              {errors.quantity && (
                <div
                  className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">{errors.quantity[0]}</span>
                </div>
              )}
              <input
                type="text"
                value={bookingData.quantity}
                onChange={handleInputChange}
                name="quantity"
                // bookData itu adalah useState yang di atas

                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                booking_date
              </label>
              {errors.booking_date && (
                <div
                  className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">{errors.booking_date[0]}</span>
                </div>
              )}
              <input
                type="date"
                value={bookingData.booking_date}
                onChange={handleInputChange}
                name="booking_date"
                // bookData itu adalah useState yang di atas

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
  );
}
