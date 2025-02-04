import React, { useState, useEffect } from "react";
import "./style.css";
import { getMovies } from "../../../services/movies";
import { useLocation, useNavigate } from "react-router-dom";
import { getStudios } from "../../../services/studios";
import { updateBooking } from "../../../services/booking";

export default function MovieSeat() {
  const [selectedSeats, setSelectedSeats] = useState(0);
  const [movie, setMovie] = useState([]);
  const [studio, setStudio] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const movieId = query.get("movie_id");
  const studioId = query.get("studio_id");
  const showtime = query.get("showtime");
  const showdate_start = query.get("showdate_start");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovies();
        const movie = data.find((movie) => movie.id === parseInt(movieId));
        setMovie(movie);
      } catch (error) {
        console.error("Error fetching movie:", error);
        // Handle error, e.g., display a message to the user
      }
    };

    const fetchStudio = async () => {
      try {
        const data = await getStudios();
        const studio = data.find((studio) => studio.id === parseInt(studioId));
        setStudio(studio);
      } catch (error) {
        console.error("Error fetching studio:", error);
        // Handle error, e.g., display a message to the user
      }
    }

    fetchMovie();
    fetchStudio();
  }, [movieId, studioId]);

  const handleSeatClick = (e) => {
    if (!e.target.classList.contains("sold")) {
      e.target.classList.toggle("selected");
      const selected = document.querySelectorAll(
        ".seat-grid .seat.selected"
      ).length;
      setSelectedSeats(selected);
    }
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const totalPrice = movie.price * selectedSeats;

  const updateBookingDetails = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in to place an order.");
      const currentURL = `/moviebooking?movie_id=${movieId}&studio_id=${studioId}&showtime=${showtime}&showdate_start=${showdate_start}`;
      return navigate("/login", { state: { from: currentURL } });
    }

    const bookingData = new FormData();
    bookingData.append("movie_id", movieId);
    bookingData.append("studio_id", studioId);
    bookingData.append("showtime", showtime);
    bookingData.append("showdate_start", showdate_start);
    bookingData.append("quantity", selectedSeats);
    bookingData.append("total_price", totalPrice);
    bookingData.append('_method', 'PUT')
    
    try {
      await updateBooking(bookingData);
      return navigate("#");
    } catch (err) {
      // console.log(err.response.data.message);
      setErrors(err.response.data.message);
    }

  }
  

  return (
    <div className="flex flex-col items-center justify-center dark:bg-gray-900 text-white w-full p-8">
      <div className="w-full flex items-center justify-center">
        <div className="w-1/2 mb-4">
          <table className="w-full">
            <thead className="text-sm text-black uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-left">
              <tr>
                <th className="px-2 py-4">Movie</th>
                <th className="px-2 py-4">Studio</th>
                <th className="px-2 py-4">Time</th>
                <th className="px-2 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 dark:text-gray-400">
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-2 py-2">{movie.title}</td>
                <td className="px-2 py-2">{studio.name}</td>
                <td className="px-2 py-2">{showtime}</td>
                <td className="px-2 py-2">{showdate_start}</td>
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
        <div className="seat-grid flex flex-col items-center">
          {Array.from({ length: 11 }, (_, rowIndex) => {
            const rowLabel = String.fromCharCode(65 + rowIndex);
            return (
              <div
                key={rowIndex}
                className="flex items-center justify-center gap-2 mb-2"
              >
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="seat text-center"
                    onClick={handleSeatClick}
                  >
                    {rowLabel}
                    {index + 1}
                  </div>
                ))}
                <div className="mx-4 text-center text-black dark:text-white">
                  {rowLabel}
                </div>
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="seat text-center"
                    onClick={handleSeatClick}
                  >
                    {rowLabel}
                    {index + 10}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center dark:bg-gray-900 text-white divcon">
        <div className="flex w-full">
          <div className="flex dark:bg-gray-900 text-white w-1/2">
            <p className="flex text-center text-lg text-gray-900">
              Total Price: {formatRupiah(totalPrice)}
            </p>
          </div>
          <div className="flex flex-col dark:bg-gray-900 text-white items-left">
            <p className="flex text-lg text-gray-900">
              Total Seat: {selectedSeats}
            </p>
          </div>
        </div>
      </div>

      <button onClick={updateBookingDetails} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
        Book Your Ticket
      </button>
    </div>
  );
}
