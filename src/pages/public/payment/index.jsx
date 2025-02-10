import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooking } from "../../../services/booking";

export default function AdminBookings() {
  const [booking, setBooking] = useState([]);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBooking();
        const booking = data.filter(
          (booking) => booking.user_id === parseInt(userInfo.id)
        );
        setBooking(booking);
      } catch (error) {
        console.error("Error fetching booking:", error);
        // Handle error, e.g., display a message to the user
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

              {booking.map((booking) => (
              <tr key={booking.user_id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{userInfo.id}</td>
                <td className="border px-4 py-2">{booking.quantity}</td>
                <td className="border px-4 py-2">{formatRupiah(booking.amount)}</td>

                <td className="border px-4 py-2">
                  <Link
                    to={`/booking/pay/${booking.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
                  >
                    Pay
                  </Link>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
