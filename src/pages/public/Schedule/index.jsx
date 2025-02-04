import { useEffect, useState } from "react";
import { getPaymentmethods } from "../../../services/paymentMethod";

export default function Payment() {
  const [payment_methods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 menit dalam detik

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const data = await getPaymentmethods();
      setPaymentMethods(data);
    };

    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getPaymentMethodsName = (id) => {
    const payment_method = payment_methods.find((pm) => pm.id === id);
    return payment_method
      ? {
          name: payment_method.name,
          account_number: payment_method.account_number,
        }
      : {
          name: "Unknown Payment Method",
          account_number: "",
        };
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Payment</h2>

      {payment_methods.length > 0 ? (
        payment_methods.map((payment_method) => {
          const { name, account_number } = getPaymentMethodsName(
            payment_method.id
          );
          const isSelected = selectedMethod === payment_method.id;

          return (
            <div
              key={payment_method.id}
              className={`group border rounded-md p-4 m-2 cursor-pointer ${
                isSelected ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedMethod(payment_method.id)}
            >
              <div className="flex items-center">
                <div className="flex-grow">
                  <div className="text-base font-medium">{name}</div>
                  <div className="text-sm text-gray-500">{account_number}</div>
                </div>
                <div className="ml-4">
                  <i className="fa-regular fa-credit-card"></i>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No payment methods available</p>
      )}

      {/* Order Summary */}
      <div className="space-y-2 mt-4">
        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
          <dt className="text-base text-gray-900">Original price</dt>
          <dd className="text-base text-gray-900">Rp. 35.000</dd>
        </dl>

        <dl className="flex items-center justify-between gap-4 border-gray-200 pt-2">
          <dt className="text-base text-gray-900">Seat</dt>
          <dd className="text-base text-gray-900">2</dd>
        </dl>

        <dl className="flex items-center justify-between gap-4 border-gray-200 pt-2">
          <dt className="text-base text-gray-900">Please complete the payment</dt>
          <dd className="text-base text-red-500 font-bold">{formatTime(timeRemaining)}</dd>
        </dl>

        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
          <dt className="text-base font-bold text-gray-900">Total</dt>
          <dd className="text-base font-bold text-gray-900">Rp.70.000</dd>
        </dl>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button className="bg-red-500 text-white w-full hover:bg-red-600 px-4 py-2 rounded-lg">
          Pay now
        </button>
      </div>
    </div>
  );
}
