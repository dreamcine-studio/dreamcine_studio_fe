import { Link } from "react-router-dom";
import payments from "../../../utils/constants/payment";

export default function Payments() {
    return (
      <>
        <div className="w-full">
          <div className="datatable-container">
              <Link to={`/admin/payments/create`} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                <i className="fa-solid fa-plus mr-2"></i>
                Add Data
              </Link>
              
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
                {payments.map((schedule, index) => (
                  <tr key={index} data-index={index} className="hover:bg-gray-50 border-b border-gray-200">
                    <td className="py-4 pl-5">{schedule.payment_code}</td>
                    <td className="py-4 pl-7">{schedule.booking_id}</td>
                    <td className="py-4 pl-12">{schedule.payment_method_id }</td>
                    <td className="py-4 pl-5">{schedule.amount }</td>
                    <td className="py-4 pl-5">{schedule.payment_date}</td>
                    <td className="py-4 pl-5">{schedule.status}</td>
                    <td className="py-4 pl-5">
                      <div className="flex items-center gap-4 mx-2">
                        <Link to={`/admin/payments/edit/${payments.id}`}>
                        <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <button>
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
  