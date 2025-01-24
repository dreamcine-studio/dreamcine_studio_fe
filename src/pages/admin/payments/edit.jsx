import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPayments, updatePayment } from "../../../services/payment";

export default function PaymentEdit() {

  const [payments, setPayments] = useState();

  //Destruct ID dari URL
  const { id } = useParams()
  const navigate = useNavigate()

  //fetch datanbuku berdasarkan ID
  const fetchPaymentDetails = async () => {
     const data = await getPayments() // ambil semua data buku

     //cari data buku berdasarkan ID
     const payment =data.find(payment => payment.id === parseInt(id)) //find itu mencari
     if (payment) {
          //Assign data to state
          setPayments(payment.status)
     } 

  }
  
  
  useEffect(() => {
      fetchPaymentDetails()
  }, []);

  //upload book data
  const updatePaymentDetails = async(e) => {
      e.preventDefault()

      //buat FormData
      const paymentData = new FormData()
      paymentData.append('status', payments)
      paymentData.append('_method', 'PUT')
  
      await updatePayment(id, paymentData)
       .then(() => {
          navigate('/admin/payments')
          console.log(paymentData)
       }) 
       .catch((err) => {
          console.log(err.response.data.message)
       })

  }

    return (
      <div className="flex flex-col gap-9">
        <div
          className="rounded-sm bg-white shadow-default dark:bg-boxdark"
        >
          <div
            className="border-b border-stroke px-6.5 py-4 dark:border-strokedark"
          >
            <h3 className="font-medium text-black dark:text-white">
              Edit Data Payments
            </h3>
          </div>
          <form onSubmit={updatePaymentDetails} className="py-5">
              <div className="mb-4.5">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
              >
                Status
              </label>
              <div
                className="relative z-20 bg-transparent dark:bg-form-input"
              >
                <select
                  name="status"
                  value={payments}
                  onChange={(e) => setPayments(e.target.value)}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-indigo-600 active:border-indigo-600 dark:border-form-strokedark dark:bg-form-input dark:focus:border-indigo-600"
                >
                  <option value="" className="text-body">
                    --select status--
                  </option>
                </select>
                {payments.map((payment) => (
                    <option key={payment.id} value={payment.id} className="text-body">{payment.status}</option>
                ))}
                <span
                  className="absolute right-4 top-1/2 z-30 -translate-y-1/2"
                >
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
          </form>
        </div>
      </div>
    )
  }
  