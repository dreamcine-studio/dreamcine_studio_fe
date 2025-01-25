import React, { useState, useEffect } from "react";
import "./style.css";
import { showSchedules } from "../../../services/schedules";
import { showMovie } from "../../../services/movies"; 
import { useNavigate } from "react-router-dom";

export default function BookingPublic() {
  // State untuk menampung data schedules
  const [schedules, setSchedules] = useState([]);
  // State untuk jadwal yang dipilih
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  // State untuk film yang terkait dengan jadwal yang dipilih
  const [selectedMovie, setSelectedMovie] = useState(null);
  // State untuk data booking
  const [bookingData, setBookingData] = useState({
    quantity: 0,
  });

  const navigate = useNavigate();

  // Fungsi untuk memformat harga ke dalam format Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number);
  };

  // Mengambil data schedules
  const fetchSchedules = async () => {
    try {
      const data = await showSchedules();
      setSchedules(data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  // Mengambil data movie berdasarkan movie_id
  const fetchMovie = async (id) => {
    try {
      const movie = await showMovie(id);
      setSelectedMovie(movie);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  // Menjalankan function fetchSchedules saat komponen dirender
  useEffect(() => {
    fetchSchedules();
  }, []);

  // Ketika user memilih jadwal
  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
    fetchMovie(schedule.movie_id);
  };

  // Ketika user memilih kursi
  const handleSeatClick = (e) => {
    if (!e.target.classList.contains("sold")) {
      e.target.classList.toggle("selected");

      // Hitung hanya elemen 'seat selected' dalam container 'seat-grid'
      const selectedSeats = document.querySelectorAll(".seat-grid .seat.selected").length;
      setBookingData({ ...bookingData, quantity: selectedSeats });
    }
  };

  // Ketika user mengklik tombol "Book Now"
  const handleBookNow = async () => {
    try {
      await fetchSchedules();
      navigate('/public/dreamcine.jpeg');
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center dark:bg-gray-900 text-white w-full p-8">
        {/* Tabel Schedules */}
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
                {schedules.map((schedule) => (
                  <tr
                    key={schedule.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                    onClick={() => handleScheduleClick(schedule)}
                  >
                    <td className="px-2 py-2">{schedule.movie_id}</td>
                    <td className="px-2 py-2">{schedule.showtime}</td>
                    <td className="px-2 py-2">{schedule.booking_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Informasi Jadwal dan Film yang Dipilih */}
        {selectedSchedule && selectedMovie && (
          <div className="w-full p-4 bg-gray-200 dark:bg-gray-800 rounded text-gray-900 dark:text-white">
            <h2 className="text-lg font-bold">Selected Schedule</h2>
            <p>Movie: {selectedMovie.title}</p>
            <p>Showtime: {selectedSchedule.showtime}</p>
            <p>Date: {selectedSchedule.booking_date}</p>
          </div>
        )}

        {/* Legenda Kursi */}
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

        {/* Grid Kursi */}
        <div className="my-6">
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
        </div>

        {/* Informasi Total */}
        {selectedSchedule && selectedMovie && (
          <div className="flex flex-col items-center dark:bg-gray-900 text-white divcon">
            <div className="flex w-full">
              {/* Total Harga */}
              <div className="flex dark:bg-gray-900 text-white w-1/2">
                <p className="flex text-center text-lg text-gray-900">
                  Total Price: {selectedMovie?.price ? formatRupiah(bookingData.quantity * selectedMovie.price) : "Rp 0"}
                </p>
              </div>
              {/* Total Kursi */}
              <div className="flex flex-col dark:bg-gray-900 text-white items-left">
                <p className="flex text-lg text-gray-900">Total Seat: {bookingData.quantity}</p>
              </div>
            </div>
          </div>
        )}

        <button onClick={handleBookNow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
          Book Your Ticket
        </button>
      </div>
    </>
  );
}
