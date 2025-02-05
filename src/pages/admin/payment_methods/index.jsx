import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deletePaymentmethod,
  getPaymentmethods,
} from "../../../services/paymentMethod";

export default function AdminPaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchPmethods = async () => {
      const data = await getPaymentmethods();
      setPaymentMethods(data);
    };
    fetchPmethods();
  }, []);

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
    <div className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Link
        to={"/admin/payment_methods/create"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Tambah data
      </Link>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="border-b bg-gray-50 text-white">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                account_number
              </th>

              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.length > 0 ? (
              paymentMethods.map((payMentmethod) => (
                <tr key={payMentmethod.id} className="hover:bg-gray-50">
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
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button onClick={() => handleDelete(payMentmethod.id)}>
                        <i className="fa-solid fa-trash"></i>
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
