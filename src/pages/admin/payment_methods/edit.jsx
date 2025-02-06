import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPaymentmethods,
  updatePaymentmethod,
} from "../../../services/paymentMethod";

export default function PaymentMethodEdit() {
  const [errors, setErrors] = useState({});

  const [name, setName] = useState(""); //ush
  const [account_number, setAccountNumber] = useState("");

  //Destruct ID dari URL
  const { id } = useParams();
  const navigate = useNavigate();

  //fetch datanbuku berdasarkan ID
  const fetchPmethodDetails = async () => {
    const data = await getPaymentmethods(); // ambil semua data buku


    const paymentMethod = data.find(
      (paymentMethod) => paymentMethod.id === parseInt(id)
    ); 
    if (paymentMethod) {
      //Assign data to state
      setName(paymentMethod.name);
      setAccountNumber(paymentMethod.account_number);
    }
    //    console.log(pmethod)
  };

  useEffect(() => {
    fetchPmethodDetails();
  }, []);

  //upload pmethod data
  const updatePaymentMethodDetails = async (e) => {
    //utk form submit
    e.preventDefault();

    //buat FormData
    const PaymentMethodData = new FormData();

    PaymentMethodData.append("name", name);
    PaymentMethodData.append("account_number", account_number);
    PaymentMethodData.append("_method", "PUT");

    await updatePaymentmethod(id, PaymentMethodData)
      .then(() => {
        // redirect ke halaman index
        navigate("/admin/payment_methods");
        console.log("data", PaymentMethodData);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrors(err.response.data.message);
      });

    // console.log(PaymentMethodData)
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black">
            Edit Payment Methods
          </h3>
        </div>
        <form onSubmit={updatePaymentMethodDetails} className="py-5">
          <div className="p-6.5 flex flex-col gap-5">
            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black">
                Name
              </label>
              {errors.name && (
                <div
                  className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">{errors.name[0]}</span>
                </div>
              )}
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-indigo-600"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black">
                Account Number
              </label>
              {errors.account_number && (
                <div
                  className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">
                    {errors.account_number[0]}
                  </span>
                </div>
              )}
              <textarea
                name="account_number"
                value={account_number}
                onChange={(e) => setAccountNumber(e.target.value)}
                rows="6"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-indigo-600"
              ></textarea>
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
  );
}
