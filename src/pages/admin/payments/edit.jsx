import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPayments, updatePayment } from "../../../services/payment";
import { getPaymentmethods } from "../../../services/paymentMethod";
import { getBooking } from "../../../services/booking";

export default function PaymentEdit() {
  const [bookings, setBookings] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [paymentCodes, setPaymentCodes] = useState([]);
  const [bookingId, setBookingId] = useState([]);
  const [paymentMethodId, setPaymentMethodId] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [paymentDates, setPaymentDates] = useState([]);
  const [payments, setPayments] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPaymentDetails = async () => {
    const data = await getPayments();

    
    const payment = data.find((payment) => payment.id === parseInt(id)); //find itu mencari

    if (payment) {
      //Assign data to state
      setPaymentCodes(payment.payment_code);
      setBookingId(payment.booking_id);
      setPaymentMethodId(payment.payment_method_id);
      setAmounts(payment.amount);
      setPaymentDates(payment.payment_date)
      setPayments(payment.status);
    }
  };

  const fetchBookings = async () =>{
    const data = await getBooking()
    setBookings(data)
}

  const fetchPaymentMethods = async () =>{
    const data = await getPaymentmethods()
    setPaymentMethods(data)
}

  useEffect(() => {
    fetchBookings();
    fetchPaymentMethods();
    fetchPaymentDetails();
  }, [id]);

  const updatePaymentDetails = async (e) => {
    e.preventDefault();

    const paymentData = new FormData()
    paymentData.append("payment_code", paymentCodes);
    paymentData.append("booking_id", bookingId);
    paymentData.append("payment_method_id", paymentMethodId);
    paymentData.append("amount", amounts);
    paymentData.append("payment_date", paymentDates);
    paymentData.append("status", payments);
    paymentData.append("_method", "PUT");

    await updatePayment(id, paymentData)
      .then(() => {
        navigate("/admin/payments");
        console.log(paymentData);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black">
            Edit Data Payments
          </h3>
        </div>
        <form onSubmit={updatePaymentDetails} className="py-5">
        <div className="p-6.5 flex flex-col gap-5 text-gray-900">
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-gray-900">
                Payment Code
              </label>
              <input
                name="payment_code"
                disabled
                value={paymentCodes}
                onChange={(e) => setPaymentCodes(e.target.value)}
                type="text"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-indigo-600"
              />
            </div>
        <div className="p-6.5 flex flex-col gap-5">
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-gray-900">
                Booking
              </label>
              <input
                name="booking_id"
                disabled
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                type="text"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-indigo-600"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black">
                  Payment Method
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select 
                      name="genre_id"
                      disabled
                      value={paymentMethodId}
                      onChange={(e) => setPaymentMethodId(e.target.value)}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-indigo-600 active:border-indigo-600 dark:border-form-strokedark dark:bg-form-input dark:focus:border-indigo-600">
                      <option value="" className="text-body">
                          --select payment method--
                      </option>
                      {paymentMethods.map((paymentMethod) => (
                          <option key={paymentMethod.id} value={paymentMethod.id} className="text-body">{paymentMethod.name}</option>
                      ))}
                  </select>
                  <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                          <g opacity="0.8">
                              <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                  fill=""
                              ></path>
                          </g>
                      </svg>
                </span>
              </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black">
                Amount
              </label>
              <input
                name="amounts"
                disabled
                value={amounts}
                onChange={(e) => setAmounts(e.target.value)}
                type="number"
                min={1}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-indigo-600"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black">
                Payment Date
              </label>
              <input
                name="payment date"
                disabled
                value={paymentDates}
                onChange={(e) => setPaymentDates(e.target.value)}
                type="date"
                min={1}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-indigo-600"
              />
            </div>  
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black">
              Status
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                name="status"
                value={payments}
                onChange={(e) => setPayments(e.target.value)}
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-indigo-600 active:border-indigo-600 dark:border-form-strokedark dark:bg-form-input dark:focus:border-indigo-600"
              >
                <option value="" className="text-body">
                  --select status--
                </option>
                <option value="pending" className="text-body">
                  Pending
                </option>
                <option value="confirmed" className="text-body">
                  Confirmed
                </option>
                <option value="failed" className="text-body">
                  Failed
                </option>
              </select>
              <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                <svg
                  className="fill-current py-4"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill=""
                    ></path>
                  </g>
                </svg>
              </span>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-indigo-600 p-3 font-medium text-white hover:bg-opacity-90"
            >
              Save
            </button>
          </div>
          </div>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}
