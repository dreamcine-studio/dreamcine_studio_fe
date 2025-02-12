import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBooking } from "../../../services/booking";
import { getPayments } from "../../../services/payment";

export default function AdminBookings() {
  const [booking, setBooking] = useState([]);
  const [payment, setPayment] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
              const [bookingData, paymentData] =
                await Promise.all([
                  getBooking(),
                  getPayments(),
                ]);
      
              const booking = bookingData.filter(
                (booking) => booking.user_id === parseInt(userInfo.id)
              );
              setBooking(booking);

              const payment = paymentData.filter(
                (payment) => payment.booking_id === parseInt(id)
              );
              setPayment(payment);
      


              // Extract schedule ID from booking data
              if (paymentData && paymentData.booking_id) {
                const selectedbooking = bookingData.filter(
                  (b) => b.id === paymentData.booking_id
                );
                setBooking(selectedbooking);
              } else {
                setPayment(null);
              }
            } catch (error) {
              setError("Failed to fetch data, please try again later.");
              console.log(error);
            } finally {
              setLoading(false);
            }
          };
          fetchData();
    // const fetchBooking = async () => {
    //   try {
    //     const data = await getBooking();
    //     const booking = data.filter(
    //       (booking) => booking.user_id === parseInt(userInfo.id)
    //     );
    //     setBooking(booking);
    //   } catch (error) {
    //     console.error("Error fetching booking:", error);
    //     // Handle error, e.g., display a message to the user
    //   }
    // };

    // fetchBooking();
  }, []);

  const getPay = (id) => {
    const pay = payment.filter((item) => item.id === id);
    return pay ? pay.id : "Unknown pay";
  };

    console.log("test", booking);
    console.log("pay", payment);

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
