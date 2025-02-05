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
      const [
        paymentsData,
        paymentMethodsData,
      ] = await Promise.all( [
        getPayments(),
        getPaymentmethods(),
      ]);
  
      setPayments(paymentsData);
      setPaymentMethods(paymentMethodsData);

      }catch (error){
        setError("Failed to fetch data, please try again later : ")
        console.error("Error fetching movie:", error);

      } finally {
        setLoading(false)
      }
    }

    fetchData();
	
  }, []);
 
 

  
  if (Loading) {
    return (
      <main className="py-6 px-12 space-y-2 bg-gray-300 min-h-screen w-full flex items-center justify-center">
        {/* Loading Spinner */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 border-4 border-solid border-transparent rounded-full
            animate-spin
            border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-pink-500">
          </div>
          {/* Teks dengan Efek Bounce */}
          <div className="text-2xl font-bold text-gray-800 animate-bounce">
            Please Wait ..
          </div>
        </div>
      </main>
    );
  }

    
  if (error){
    return (
      <main className="py-l px-12 space-y-2 bg-gray-100 min-h-screen w-full flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-500"> {error} .. </div>
      </main>
    )
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
      <div className="w-full">
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
                    <p>status</p>
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
                  <td className="py-4 pl-12">
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
