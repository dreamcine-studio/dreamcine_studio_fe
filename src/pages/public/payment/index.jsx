import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { showBooking } from "../../../services/booking";
// import { createSeat } from "../../../services/seat";
// import { getSchedules } from "../../../services/schedules";

export default function AdminBookings() {
  const [booking, setBooking] = useState([]);
  //   const [schedules, setSchedules] = useState([]);
  //   const [errors, setErrors] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   const [amount, setAmount] = useState("");
  //   const [quantity, setQuantity] = useState("");

//   const query = new URLSearchParams(location.search);
//   const bookingId = query.get("booking_id");

    const { id } = useParams();

  useEffect(() => {
    // const fetchBooking = async () => {
    //   try {
    //     const data = await getBooking();
    //     const booking = data.find(
    //       (booking) => booking.id === parseInt(bookingId)
    //     );
    //     setBooking(booking);
    //   } catch (error) {
    //     console.error("Error fetching booking:", error);
    //     // Handle error, e.g., display a message to the user
    //   }
    // };

    const fetchBooking = async () => {
          try {
            const data = await showBooking(id);
            setBooking(data)
          } catch (error) {
            console.error("Error fetching movie:", error);
          }
        };

    fetchBooking();
  }, []);

    console.log("test", booking);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const createBookingDetails = async (e) => {
    e.preventDefault();

    // const token = localStorage.getItem("accessToken");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const bookingData = new FormData();
    bookingData.append("user_id", userInfo.id);
    bookingData.append("quantity", booking.quantity);
    bookingData.append("amount", booking.amount);

    //     const seatData = new FormData();
    //     selectedSeats.forEach((seatNumber) => {
    //       seatData.append("seat_number[]", seatNumber);
    //     });
    //     seatData.append("studio_id", studioId);

    //     try {
    //       await createBooking(bookingData);
    //       await createSeat(seatData);
    //         alert("Booking successful!");
    //         return navigate("/schedules");
    //     } catch (errors) {
    //       // console.log(err.response.data.message);
    //       setErrors(errors.response.data.message);
    //     }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-4">Booking</h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-4 py-2 text-left">User</th>
                <th className="border px-4 py-2 text-left">Quantity</th>
                <th className="border px-4 py-2 text-left">Amount</th>
                {/* <th className="border px-4 py-2 text-left"></th> */}
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border px-4 py-2">{userInfo.id}</td>
                <td className="border px-4 py-2">{booking.quantity}</td>
                <td className="border px-4 py-2">{formatRupiah(booking.amount)}</td>

                <td className="border px-4 py-2">
                  <Link
                    onChange={createBookingDetails}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
                  >
                    pay now
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <Link
          onChange={createBookingDetails}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
        >
          pay now
        </Link> */}
      </div>
    </div>
  );
}
