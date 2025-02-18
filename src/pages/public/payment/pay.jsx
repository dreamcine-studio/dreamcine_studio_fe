import { useEffect, useState } from "react";
import { getPaymentmethods } from "../../../services/paymentMethod";
import { showBooking } from "../../../services/booking";
import { useNavigate, useParams } from "react-router-dom";
import { getMovies } from "../../../services/movies";
import { getSchedules } from "../../../services/schedules";
import { createPayments } from "../../../services/payment";

export default function Payment() {
  const [booking, setBooking] = useState({});
  const [schedule, setSchedule] = useState({});
  const [movies, setMovie] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [payment_methods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [bookingData, scheduleData, movieData, paymentMethodData] =
          await Promise.all([
            showBooking(id),
            getSchedules(),
            getMovies(),
            getPaymentmethods(),
          ]);

        setBooking(bookingData);
        setMovie(movieData);
        setPaymentMethods(paymentMethodData);

        // Extract schedule ID from booking data
        if (bookingData && bookingData.schedule_showtime_id) {
          const selectedSchedule = scheduleData.find(
            (s) => s.id === bookingData.schedule_showtime_id
          );
          setSchedule(selectedSchedule || {});
        } else {
          setSchedule(null);
        }
      } catch (error) {
        setError("Failed to fetch data, please try again later.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getMoviePrice = (id) => {
    const movie = movies.find((item) => item.id === id);
    return movie ? movie.price : "Unknown movie";
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const storePayment = async (e) => {
    e.preventDefault();

    // Check if a payment method is selected
  if (!selectedMethod) {
    alert("Please select a payment method");
    return; // Stop further execution if no payment method is selected
  }


    const formDataToSendPayment = new FormData();
    formDataToSendPayment.append("booking_id", booking.id);
    formDataToSendPayment.append("payment_method_id", selectedMethod);
    formDataToSendPayment.append("amount", booking.amount);

    try {
      await createPayments(formDataToSendPayment);
      alert("Payment Successful");
      navigate("/booking");
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  const getPaymentMethodsName = (id) => {
    const payment_method = payment_methods.find((pm) => pm.id === id);
    return payment_method
      ? {
          name: payment_method.name,
          account_number: payment_method.account_number,
        }
      : {
          name: "Unknown Payment Method",
          account_number: "",
        };
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
    <form
      onSubmit={storePayment}
      className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6"
    >
      <h2 className="text-lg font-semibold mb-4">Payment</h2>

      {payment_methods.length > 0 ? (
        payment_methods.map((payment_method) => {
          const { name, account_number } = getPaymentMethodsName(
            payment_method.id
          );
          const isSelected = selectedMethod === payment_method.id;

          return (
            <div
              key={payment_method.id}
              className={`group border rounded-md p-4 m-2 cursor-pointer ${
                isSelected ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedMethod(payment_method.id)}
            >
              <div className="flex items-center">
                <div className="flex-grow">
                  <div className="text-base font-medium">{name}</div>
                  <div className="text-sm text-gray-500">{account_number}</div>
                </div>
                <div className="ml-4">
                  <i className="fa-regular fa-credit-card"></i>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No payment methods available</p>
      )}

      {/* Order Summary */}
      <div className="space-y-2 mt-4">
        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
          <dt className="text-base text-gray-900">Original price</dt>
          <dd className="text-base text-gray-900">
            {formatRupiah(getMoviePrice(schedule?.movie_id))}
          </dd>
        </dl>

        <dl className="flex items-center justify-between gap-4 border-gray-200 pt-2">
          <dt className="text-base text-gray-900">Seat</dt>
          <dd className="text-base text-gray-900">{booking.quantity}</dd>
        </dl>

        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
          <dt className="text-base font-bold text-gray-900">Total</dt>
          <dd className="text-base font-bold text-gray-900">
            {formatRupiah(booking.amount)}
          </dd>
        </dl>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-red-500 text-white w-full hover:bg-red-600 px-4 py-2 rounded-lg"
        >
          Pay now
        </button>
      </div>
    </form>
  );
}