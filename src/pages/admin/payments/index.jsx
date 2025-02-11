import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletePayment, getPayments } from "../../../services/payment";
import { getPaymentmethods } from "../../../services/paymentMethod";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [Loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [paymentsData, paymentMethodsData] = await Promise.all([
          getPayments(),
          getPaymentmethods(),
        ]);

        setPayments(paymentsData);
        setPaymentMethods(paymentMethodsData);
      } catch (error) {
        setError("Failed to fetch data, please try again later : ");
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(paymentMethods);
  

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number);
  };

  if (Loading) {
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

  const getPMethodName = (id) => {
    const paymentMethod = paymentMethods.find((g) => g.id === id);
    return paymentMethod ? paymentMethod.name : "Unknown Payment Method";
  };

  const handleDelete = async (id) => {
    const confirmedDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini"
    );

    if (confirmedDelete) {
      await deletePayment(id);
      setPayments(payments.filter((payments) => payments.id !== id));
    }
  };

  return (
    <>
      <div className="w-full min-h-screen">
        <div>
          <h1 className="text-2xl text-center font-bold dark:text-white">
            Payment
          </h1>
        </div>

        <div className="datatable-container">
          <table className="table w-full table-auto datatable-table mt-4">
            <thead className="border-b bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-white">
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-2">
                  <div className="flex items-center uppercase gap-1.5">
                    <p>Payment Code</p>
                  </div>
                </th>
                <th className="py-4 px-2">
                  <div className="flex items-center uppercase gap-1.5">
                    <p>Booking</p>
                  </div>
                </th>
                <th className="py-4 px-2">
                  <div className="flex items-center uppercase gap-1.5">
                    <p>Payment Method</p>
                  </div>
                </th>
                <th className="py-4 px-2">
                  <div className="flex items-center uppercase gap-1.5">
                    <p>Amount </p>
                  </div>
                </th>
                <th className="py-4 px-2 pl-2">
                  <div className="flex items-center uppercase gap-1.5">
                    <p>Payment Date</p>
                  </div>
                </th>
                <th className="py-4 px-2 pl-5">
                  <div className="flex items-center uppercase gap-1.5">
                    <p>Status</p>
                  </div>
                </th>
                <th className="py-4 px-2 pl-5">
                  <div className="flex items-center uppercase gap-1.5">
                    <p>Controls</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={index}
                  data-index={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <td className="py-4 pl-5 dark:text-white">
                    {payment.payment_code}
                  </td>
                  <td className="py-4 pl-7 dark:text-white">
                    {payment.booking_id}
                  </td>
                  <td className="py-4 pl-7 dark:text-white">
                    {getPMethodName(payment.payment_method_id)}
                  </td>
                  <td className="py-4 pl-5 dark:text-white">
                    {formatRupiah(payment.amount)}
                  </td>
                  <td className="py-4 pl-5 dark:text-white">
                    {payment.payment_date}
                  </td>
                  <td
                    className={`py-4 pl-5 font-bold ${
                      payment.status === "pending"
                        ? "text-yellow-500"
                        : payment.status === "confirmed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {payment.status}
                  </td>
                  <td className="py-4 pl-5 dark:text-white">
                    <div className="flex items-center gap-4 mx-2">
                      <Link to={`/admin/payments/edit/${payment.id}`}>
                        <i className="fa-solid fa-pen-to-square text-orange-500"></i>
                      </Link>
                      <button onClick={() => handleDelete(payment.id)}>
                        <i className="fa-solid fa-trash text-red-700 dark:text-red-500"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
