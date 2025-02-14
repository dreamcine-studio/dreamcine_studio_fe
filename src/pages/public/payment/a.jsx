import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBooking } from "../../../services/booking";
import { getPayments } from "../../../services/payment";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [payment, setPayment] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countdowns, setCountdowns] = useState({});
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [bookingData, paymentData] = await Promise.all([
          getBooking(id),
          getPayments(),
        ]);

        const filteredBooking = bookingData.filter(
          (booking) => booking.user_id === parseInt(userInfo.id)
        );

        setBookings(filteredBooking);
        setPayment(paymentData);
      } catch (error) {
        setError("Failed to fetch data, please try again later.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userInfo.id, id]);

  // Ambil jam dan menit dari booking.created_at
  useEffect(() => {
    const intervals = {};

    bookings.forEach((booking) => {
      const deadline = new Date(booking.created_at);
      deadline.setMinutes(deadline.getMinutes() + 1); // Tambahkan 30 menit ke waktu created_at

      // Set interval untuk menghitung mundur setiap detik
      intervals[booking.id] = setInterval(() => {
        const now = new Date();
        const timeRemaining = deadline - now; // Selisih waktu antara deadline dan waktu sekarang

        if (timeRemaining <= 0) {
          clearInterval(intervals[booking.id]); // Hentikan interval ketika waktu habis
          if (!hasPaymentCode(booking.id)) {
            setBookings((prevBookings) => prevBookings.filter((b) => b.id !== booking.id));
          }
        } else {
          const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
          setCountdowns((prev) => ({
            ...prev,
            [booking.id]: `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`, // Format waktu MM:SS
          }));
        }
      }, 1000); // Update setiap detik
    });

    return () => {
      // Bersihkan interval saat komponen dihapus atau berubah
      Object.values(intervals).forEach(clearInterval);
    };
  }, [bookings]);

  console.log("bok", bookings);
  console.log("pay", payment);
  

  const hasPaymentCode = (bookingId) => {
    const paymentForBooking = payment.find((item) => item.booking_id === bookingId);
    return paymentForBooking ? paymentForBooking.payment_code : null;
  };

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
                <th className="border px-4 py-2 text-left">Time (Payment Countdown)</th>
                <th className="border px-4 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{userInfo.name || userInfo.id}</td>
                  <td className="border px-4 py-2">{booking.quantity}</td>
                  <td className="border px-4 py-2">
                    {!hasPaymentCode(booking.id) && countdowns[booking.id]}
                  </td>
                  <td className="border px-4 py-2">{formatRupiah(booking.amount)}</td>
                  <td className="border px-4 py-2">
                    {hasPaymentCode(booking.id) ? (
                      <Link
                        to={`/ticket`}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-6"
                      >
                        Barcode
                      </Link>
                    ) : (
                      countdowns[booking.id] && (
                        <Link
                          to={`/booking/pay/${booking.id}`}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
                        >
                          Pay
                        </Link>
                      )
                    )}
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
