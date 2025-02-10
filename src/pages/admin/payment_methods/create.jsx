import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPaymentmethod } from "../../../services/paymentMethod";

export default function PaymentMethodCreate() {
  const [errors, setErrors] = useState({});

  const [paymentMethodData, setPaymentMethodData] = useState({
    name: "",
    account_number: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentMethodData({ ...paymentMethodData, [name]: value });
  };

  //Handle submit
  const storePaymentMethod = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("name", paymentMethodData.name);
    formDataToSend.append("account_number", paymentMethodData.account_number);

    try {
      await createPaymentmethod(formDataToSend);
      return navigate("/admin/payment_methods");
    } catch (err) {
      // console.log(err.response.data.message)
      setErrors(err.response.data.message);
    }
  };

  console.log(paymentMethodData);

  return (
    <div className="flex flex-col gap-9 min-h-screen">
      <div className="rounded-sm shadow-default dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="text-xl font-semibold text-black dark:text-white uppercase">
            Add Payment Method Data
          </h3>
        </div>
        <form onSubmit={storePaymentMethod} className="py-5">
          <div className="p-6.5 flex flex-col gap-5">
            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
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
                type="text"
                value={paymentMethodData.name}
                onChange={handleInputChange}
                name="name"
                // bookData itu adalah useState yang di atas

                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black dark:text-white outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-indigo-600"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
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
              <input
                type="number"
                name="account_number"
                value={paymentMethodData.account_number}
                onChange={handleInputChange}
                // bookData itu adalah useState yang di atas
                rows="6"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black dark:text-white outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-indigo-600"
              ></input>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-indigo-600 p-3 font-medium text-white hover:bg-opacity-90"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
