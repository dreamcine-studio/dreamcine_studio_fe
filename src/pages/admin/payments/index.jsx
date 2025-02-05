import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletePayment, getPayments } from "../../../services/payment";
import { getPaymentmethods } from "../../../services/paymentMethod";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const data = await getPayments();
      setPayments(data);
    };

    const fetchPMethods = async () => {
      const data = await getPaymentmethods();
      setPaymentMethods(data);
    };

    fetchPMethods();
    fetchPayments();
  }, []);

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
      <div className="w-full">
      <div>
        <h1 className="text-2xl font-bold mb-4">Payment</h1>
      </div>

        <div className="datatable-container">
          <table className="table w-full table-auto datatable-table mt-4">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="py-4 px-2">
                  <div className="flex items-center gap-1.5">
                    <p>Payment Code</p>
                  </div>
                </th>
                <th className="py-4 px-2">
                  <div className="flex items-center gap-1.5">
                    <p>Booking</p>
                  </div>
                </th>
                <th className="py-4 px-2">
                  <div className="flex items-center gap-1.5">
                    <p>Payment Method</p>
                  </div>
                </th>
                <th className="py-4 px-2">
                  <div className="flex items-center gap-1.5">
                    <p>Amount </p>
                  </div>
                </th>
                <th className="py-4 px-2 pl-2">
                  <div className="flex items-center gap-1.5">
                    <p>Payment Date</p>
                  </div>
                </th>
                <th className="py-4 px-2 pl-5">
                  <div className="flex items-center gap-1.5">
                    <p>Status</p>
                  </div>
                </th>
                <th className="py-4 px-2 pl-5">
                  <div className="flex items-center gap-1.5">
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
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="py-4 pl-5">{payment.payment_code}</td>
                  <td className="py-4 pl-7">{payment.booking_id}</td>
                  <td className="py-4 pl-7">
                    {getPMethodName(payment.payment_method_id)}
                  </td>
                  <td className="py-4 pl-5">{payment.amount}</td>
                  <td className="py-4 pl-5">{payment.payment_date}</td>
                  <td className="py-4 pl-5">{payment.status}</td>
                  <td className="py-4 pl-5">
                    <div className="flex items-center gap-4 mx-2">
                      <Link to={`/admin/payments/edit/${payment.id}`}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button onClick={() => handleDelete(payment.id)}>
                        <i className="fa-solid fa-trash"></i>
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
