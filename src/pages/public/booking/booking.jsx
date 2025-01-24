import React, { useState, useEffect } from "react";
import "./style.css";
import bookings from "../../../utils/constants/bookings";
import { getSchedules } from "../../../services/schedules";

export default function BookingPublic() {
  // Membuat state untuk menampung data
  const [schedules, setSchedules] = useState([]);
  const [bookingData, setBookingData] = useState({
    quantity: 0,
  });

  // Mengambil data
  const fetchSchedules = async () => {
    const data = await getSchedules();
    setSchedules(data);
  };

  // Menjalankan function fetchSchedules
  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleSeatClick = (e) => {
    if (!e.target.classList.contains("sold")) {
      e.target.classList.toggle("selected");

      // Hitung hanya elemen 'seat selected' dalam container 'seat-grid'
      const selectedSeats = document.querySelectorAll(".seat-grid .seat.selected").length;
      setBookingData({ ...bookingData, quantity: selectedSeats });
    }
  };

  return (
    <>
      

      <div className="flex flex-col items-center justify-center dark:bg-gray-900 text-white w-full p-8">

      <div className="w-full flex items-center justify-center">
        <div className="w-1/2 mb-4">
        <table className="w-full">
          <thead className="text-sm text-black uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-left">
            <tr>
              <th className="px-2 py-4">Movie</th>
              <th className="px-2 py-4">Time</th>
              <th className="px-2 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 dark:text-gray-400">
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-2 py-2">text</td>
                <td className="px-2 py-2">text</td>
                <td className="px-2 py-2">text</td>
              </tr>
          </tbody>
        </table>
        </div>
        
      </div>

        <ul className="flex justify-between p-4 rounded">
          <li className="flex items-center mx-4 text-gray-900 dark:text-white">
            <div className="seat"></div>
            <small className="ml-2">Available</small>
          </li>
          <li className="flex items-center mx-4 text-gray-900 dark:text-white">
            <div className="seat selected"></div>
            <small className="ml-2">Selected</small>
          </li>
          <li className="flex items-center mx-4 text-gray-900 dark:text-white">
            <div className="seat sold"></div>
            <small className="ml-2">Sold</small>
          </li>
        </ul>

        <div className="my-6">
          <div className="flex flex-col items-center">
            <div className="seat-grid flex flex-col items-center">
              {Array.from({ length: 11 }, (_, rowIndex) => {
                const rowLabel = String.fromCharCode(65 + rowIndex); // A-K
                return (
                  <div key={rowIndex} className="flex items-center justify-center gap-2 mb-2">
                    {[...Array(8)].map((_, index) => (
                      <div key={index} className="seat text-center" onClick={handleSeatClick}>
                        {rowLabel}{index + 1}
                      </div>
                    ))}
                    <div className="mx-4 text-center text-black dark:text-white">{rowLabel}</div>
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="seat text-center" onClick={handleSeatClick}>
                        {rowLabel}{index + 10}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="w-full h-2 my-2 flex dark:bg-white bg-gray-900 mt-6"></div>
            <p className="text-lg text-gray-900 dark:text-gray-200 flex justify-center align-center">SCREEN</p>
            <div className="w-full h-2 my-2 flex dark:bg-white bg-gray-900"></div>
          </div>
        </div>

        {bookings.map((booking, index) => (
          <div key={index} className="flex flex-col items-center dark:bg-gray-900 text-white divcon">
            <div className="flex w-full">
              <div className="flex dark:bg-gray-900 text-white w-1/2">
                <p className="flex text-center text-lg text-gray-900">Total Price: Rp {booking.price}</p>
              </div>
              <div className="flex flex-col dark:bg-gray-900 text-white items-left">
                <p className="flex text-lg text-gray-900">Selected Seat: {bookingData.quantity}</p>
              </div>
            </div>
          </div>
        ))}

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
          Book Your Ticket
        </button>
      </div>
    </>
  );
}
