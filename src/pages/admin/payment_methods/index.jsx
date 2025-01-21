// import { Link } from "react-router-dom"
// import { useEffect, useState } from "react"
// import { getPaymentMethods } from "../../../services/paymentMethods";
import { Link } from "react-router-dom";
import paymentMethods from "../../../utils/constants/paymentMethods";

export default function PayMethods() {
 
  
  return (
    <div
      className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1"
    >
      {/* ini pakai ternary */}
    
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="border-b bg-gray-50 text-white">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th
                className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11"
              >
                Name
              </th>
              <th
                className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white"
              >
                account_number
              </th>
           

              <th
                className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white"
              >
                Action
              </th>
            
            </tr>
          </thead>
          <tbody>

        
          {paymentMethods.map((pm) => ( 
            <tr key={pm.id} className="hover:bg-gray-50">
            <td
              className="px-4 py-5 pl-9 xl:pl-11"
            >
              <h5 className="font-medium text-black dark:text-white">{pm.name}</h5>         
            </td>
            <td className="px-4 py-5">
              <p className="text-black dark:text-white">{pm.account_number}</p>
              
            </td>


            <td className="px-4 py-5">
              <div className="flex items-center space-x-3.5">
                <Link to="/admin/payment_methods/create"><i className="fa-solid fa-plus"></i></Link>
                <Link to={`/admin/payment_methods/edit/${pm.name}`}><i className="fa-solid fa-pen-to-square"></i></Link>
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
  )
}