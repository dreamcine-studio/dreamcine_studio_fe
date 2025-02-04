import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentForm() {
  const [selectedMethod, setSelectedMethod] = useState("mastercard");
  const navigate = useNavigate();

  //   const getMovieData = (id) => {
  //     const movie = movies.find((m) => m.id === id);
  //     return movie
  //       ? {
  //           title: movie.title,
  //           poster: movie.poster,
  //           duration: movie.duration,
  //           price: movie.price,
  //         }
  //       : {
  //           title: "Unknown Movie",
  //           poster: "",
  //           duration: "",
  //         };
  //   };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Payment</h2>

      {/* Payment Methods */}
      {[
        {
          id: "mastercard",
          label: "Mastercard ending in 8429",
          details: "Expiry 04/2026",
          icon: "💳",
        },
        {
          id: "paypal",
          label: "Paypal account",
          icon: "💰",
        },
      ].map((method) => (
        <div
          key={method.id}
          className={`border p-3 rounded-lg flex items-center justify-between cursor-pointer mb-3 ${
            selectedMethod === method.id ? "border-blue-500" : "border-gray-300"
          }`}
          onClick={() => setSelectedMethod(method.id)}
        >
          <div>
            <input
              type="radio"
              checked={selectedMethod === method.id}
              readOnly
            />
            <span className="ml-2">{method.label}</span>
            {method.details && (
              <p className="text-sm text-gray-500">{method.details}</p>
            )}
          </div>
          <span
            className={
              method.id === "paypal" ? "text-blue-500" : "text-red-500"
            }
          >
            {method.icon}
          </span>
        </div>
      ))}

      {/* New Payment Method Form */}
      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Use a new payment method</h3>
        <input
          type="text"
          placeholder="Full name (as displayed on card)"
          className="w-full border p-2 rounded-lg mb-3"
        />
        <input
          type="text"
          placeholder="Card number"
          className="w-full border p-2 rounded-lg mb-3"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="MM/YY"
            className="w-1/2 border p-2 rounded-lg"
          />
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="CVV"
              className="w-full border p-2 rounded-lg"
            />
            <span className="absolute top-2 right-3 text-gray-500">ℹ️</span>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="space-y-2 mt-4">
        {[
          { label: "Original price", value: "$6,592.00" },
          { label: "Savings", value: "-$299.00", className: "text-green-500" },
          { label: "Store Pickup", value: "$99" },
          { label: "Tax", value: "$799" },
        ].map((item, index) => (
          <dl key={index} className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">
              {item.label}
            </dt>
            <dd
              className={`text-base font-medium ${
                item.className || "text-gray-900"
              }`}
            >
              {item.value}
            </dd>
          </dl>
        ))}
        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
          <dt className="text-base font-bold text-gray-900">Total</dt>
          <dd className="text-base font-bold text-gray-900">$7,191.00</dd>
        </dl>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
          Pay now
        </button>
        <button
          className="bg-gray-200 px-4 py-2 rounded-lg"
          onClick={() => navigate(-1)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
