import { useEffect, useState } from "react";
import { getPaymentmethods } from "../../../services/paymentMethod";
import { showBooking } from "../../../services/booking";
import { useNavigate, useParams } from "react-router-dom";
// import { getPayments } from "../../../services/payment";
import { getMovies } from "../../../services/movies";
import { getSchedules } from "../../../services/schedules";
import { createPayments } from "../../../services/payment";

export default function Payment() {
  const [booking, setBooking] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [movies, setMovie] = useState([]);
  const [paymentData, setPaymentData] = useState({
    booking_id: "",
    payment_method_id: "",
    amount: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState([]);
  const [loading, setLoading] = useState([]);
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [payment_methods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  // const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 menit dalam detik

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
        if (bookingData && bookingData.schedule_id) {
          const selectedSchedule = scheduleData.find(
            (s) => s.id === bookingData.schedule_id
          );
          setSchedule(selectedSchedule);
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
  }, []);

  // console.log("datab", booking);
  // console.log("datas", schedule);

  const getMovie = (id) => {
    const movie = movies.find((item) => item.id === id);
    return movie ? movie.price : "Unknown movie";
  };

  // console.log("movie", schedule.id);
  // console.log("tes", booking.amount)

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const storePayment = async (e) => {
    e.preventDefault();

    const formDataToSendPayment = new FormData();
    formDataToSendPayment.append("booking_id", paymentData.booking_id);
    formDataToSendPayment.append("payment_method_id", paymentData.payment_method_id);
    formDataToSendPayment.append("amount", paymentData.amount);

    try {
      await createPayments(formDataToSendPayment);
      alert("Payment Successful");
      navigate("/");
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  // const formatTime = (seconds) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  // };

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
  

  return (
    <form onSubmit={storePayment} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6"> 
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
        <dl
          onChange={handleInputChange}
          className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2"
        >
          <dt className="text-base text-gray-900">Original price</dt>
          <dd className="text-base text-gray-900">
            {formatRupiah(getMovie(schedule.id))}
          </dd>
        </dl>

        <dl
          onChange={handleInputChange}
          className="flex items-center justify-between gap-4 border-gray-200 pt-2"
        >
          <dt className="text-base text-gray-900">Seat</dt>
          <dd className="text-base text-gray-900">{booking.quantity}</dd>
        </dl>

        {/* <dl className="flex items-center justify-between gap-4 border-gray-200 pt-2">
          <dt className="text-base text-gray-900">
            Please complete the payment
          </dt>
          <dd className="text-base text-red-500 font-bold">
            {formatTime(timeRemaining)}
          </dd>
        </dl> */}

        <dl
          onChange={handleInputChange}
          className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2"
        >
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
