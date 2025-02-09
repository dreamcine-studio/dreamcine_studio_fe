import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deletePaymentmethod,
  getPaymentmethods,
} from "../../../services/paymentMethod";

export default function AdminPaymentMethods() {
 
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [Loading, setLoading] = useState([]);
  const [error, setError] = useState([]);


useEffect(() => {
  
const fetchData = async () => {
  setLoading(true);
  setError(null);

  try {
    const [
      paymentMethodsData,
    ] = await Promise.all( [
      getPaymentmethods(),
    ]);

  	setPaymentMethods(paymentMethodsData);
  
    }catch (error){
      setError("Failed to fetch data, please try again later : ");
      console.log(error);
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
            Please Wait ...
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
  



  const handleDelete = async (id) => {
    const confirmedDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini"
    );

    if (confirmedDelete) {
      await deletePaymentmethod(id);
      setPaymentMethods(
        paymentMethods.filter((paymentmethod) => paymentmethod.id !== id)
      );
    }
  };

  return (
    <div className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1 min-h-screen">
      <div className="flex items-center gap-6 justify-start">
        <h1 className="text-2xl font-bold dark:text-white text-center">Payment Methods</h1>
        <Link
        to={"/admin/payment_methods/create"}
        className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        <i className="fa-solid fa-plus mr-2"></i>
        Add Data
      </Link>
      </div>
      
      <div className="max-w-full overflow-x-auto mt-4">
        <table className="w-full table-auto mt-6">
          <thead className="border-b bg-gray-50 dark:bg-gray-900 text-white">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                Account Number
              </th>

              <th className="min-w-[150px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.length > 0 ? (
              paymentMethods.map((payMentmethod) => (
                <tr key={payMentmethod.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-4 py-5 pl-9 xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {payMentmethod.name}
                    </h5>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {payMentmethod.account_number}
                    </p>
                  </td>

                  <td className="px-4 py-5">
                    <div className="flex items-center space-x-3.5">
                      <Link
                        to={`/admin/payment_methods/edit/${payMentmethod.id}`}
                      >
                        <i className="fa-solid fa-pen-to-square text-yellow-500"></i>
                      </Link>
                      <button onClick={() => handleDelete(payMentmethod.id)}>
                        <i className="fa-solid fa-trash text-red-700 dark:text-red-500"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p>Tidak ada data PM</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
