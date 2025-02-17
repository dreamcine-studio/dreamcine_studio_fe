import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooking } from "../../../services/booking";
import { getPayments } from "../../../services/payment";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [payment, setPayment] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countdowns, setCountdowns] = useState({});
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [bookingData, paymentData] = await Promise.all([
          getBooking(),
          getPayments(),
        ]);

        const filteredBookings = bookingData.filter(
          (booking) => booking.user_id === parseInt(userInfo.id) // ambil data booking berdasarkan user yang sedang login
        );

        console.log("Filter Bookings:", filteredBookings); // cek hasil booking yang difilter

        const bookingId = filteredBookings.map((booking) => booking.id); // ambil data booking hanya id saja
        console.log("Booking IDs:", bookingId); // cek ID booking

        const filteredPayments = paymentData.filter(
          (payment) => bookingId.includes(payment.booking_id) // periksa apakah booking_id ada di bookingId
        );

        console.log("Filter Payments:", filteredPayments); // cek seluruh payment yang difilter
    

        setBookings(filteredBookings);
        setPayment(filteredPayments);
      } catch (error) {
        setError("Failed to fetch data, please try again later.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userInfo.id]);


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
            setBookings((prevBookings) =>
              prevBookings.filter((b) => b.id !== booking.id)
            );
          }
        } else {
          const minutes = Math.floor(
            (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
          );
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

  const getPaymentStatus = (bookingId) => {
    const paymentForBooking = payment.find(
      (item) => item.booking_id === bookingId
    );
    return paymentForBooking ? paymentForBooking.status : null;
  };


  const hasPaymentCode = (bookingId) => {
    const paymentForBooking = payment.find(
      (item) => item.booking_id === bookingId
    );
    return paymentForBooking;
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number);
  };

  if (loading) {
    return (
      <main className="py-6 px-12 space-y-2 bg-gray-300 min-h-screen w-full flex items-center justify-center">
        {/* Loading Spinner */}
        <div className="flex items-center space-x-4">
          <div
            className="w-16 h-16 border-4 border-solid border-transparent rounded-full
            animate-spin
            border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-pink-500"
          ></div>
          {/* Teks dengan Efek Bounce */}
          <div className="text-2xl font-bold text-gray-800 animate-bounce">
            Please Wait ..
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="py-l px-12 space-y-2 bg-gray-100 min-h-screen w-full flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-500"> {error} .. </div>
      </main>
    );
  }



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
                <th className="border px-4 py-2 text-left">
                  Time (Payment Countdown)
                </th>
                <th className="border px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.user_id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{userInfo.id}</td>
                  <td className="border px-4 py-2">{booking.quantity}</td>
                  <td className="border px-4 py-2">
                    {formatRupiah(booking.amount)}
                  </td>
                  <td className="border px-4 py-2">
                    {!hasPaymentCode(booking.id) && countdowns[booking.id]}
                  </td>

                  <td className="border px-4 py-2">
                    {hasPaymentCode(booking.id) ? (
                      getPaymentStatus(booking.id) === "pending" ? (
                        <span className="text-yellow-500">Pending</span>
                      ) : getPaymentStatus(booking.id) === "confirmed" ? (
                        <Link
                          to={`/tickets/${hasPaymentCode(booking.id).id}`}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-6"
                        >
                          Barcode
                        </Link>
                      ) : null
                    ) : (
                      <Link
                        to={`/booking/pay/${booking.id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
                      >
                        Pay
                      </Link>
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
