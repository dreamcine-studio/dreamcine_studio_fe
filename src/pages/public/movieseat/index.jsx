import { useState, useEffect } from "react";
import { getMovies } from "../../../services/movies";
import { useLocation, useNavigate } from "react-router-dom";
import { getStudios } from "../../../services/studios";
import { createBooking } from "../../../services/booking";
import { getSchedules } from "../../../services/schedules";
import { createSeat, getSeats } from "../../../services/seat";
// import { createScheduleShowtimes, getScheduleShowtimes } from "../../../services/scheduleshowtime";

export default function MovieSeat() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movie, setMovie] = useState([]);
  const [studio, setStudio] = useState([]);
  const [seat, setSeat] = useState([]);
  const [schedule, setSchedule] = useState([]);
  // const [errors, setErrors] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const movieId = query.get("movie_id");
  const studioId = query.get("studio_id");
  const scheduleId = query.get("schedule_id");
  const showtime = query.get("showtime");
  const showdate = query.get("showdate");
  const scheduleshowtimeId = query.get("scheduleshowtime")

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovies();
        const movieData = data.find((m) => m.id === parseInt(movieId));
        setMovie({ id: movieData.id, title: movieData.title, price: movieData.price });
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
  
    const fetchStudio = async () => {
      try {
        const data = await getStudios();
        const studioData = data.find((s) => s.id === parseInt(studioId));
        setStudio({ id: studioData.id, name: studioData.name, maxseats: studioData.maxseats, location: studioData.location });
      } catch (error) {
        console.error("Error fetching studio:", error);
      }
    };
  
    const fetchSchedule = async () => {
      try {
        const data = await getSchedules();
        setSchedule(data.find((s) => s.id === parseInt(scheduleId)));
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
  
    const fetchSeat = async () => {
      try {
        const data = await getSeats();
        console.log("Fetched seats data:", data); // Debugging
  
        if (Array.isArray(data)) {
          const seatData = data.filter((s) => s.schedule_showtime_id === parseInt(scheduleshowtimeId));
          setSeat(seatData);
        }
      } catch (error) {
        console.error("Error fetching seat:", error);
      }
    };
  
    fetchMovie();
    fetchStudio();
    fetchSchedule();
    fetchSeat();
  }, [movieId, studioId, scheduleId, scheduleshowtimeId]); // Perbarui saat ID berubah
  
  const handleSeatClick = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        // Jika sudah dipilih, hapus dari array
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      } else {
        // Jika belum dipilih, tambahkan ke array
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const totalPrice = movie?.price * selectedSeats.length || 0;

  const createBookingDetails = async (e) => {
    e.preventDefault();
  
    const token = sessionStorage.getItem("accessToken");
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  
    if (!token) {
      sessionStorage.setItem("redirectAfterLogin", `${window.location.pathname + window.location.search}`);
      alert("You must log in to place an order.");
      return navigate("/login");
    }
  
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
  
    const timestamp = new Date().toISOString();
  
    const bookingData = new FormData();
    bookingData.append("user_id", userInfo.id);
    bookingData.append("movie_id", movieId);
    bookingData.append("studio_id", studioId);
    bookingData.append("schedule_id", scheduleId);
    bookingData.append("showtime", showtime.slice(0, 5));
    bookingData.append("showdate", showdate);
    bookingData.append("quantity", selectedSeats.length);
    bookingData.append("amount", totalPrice);
    bookingData.append("timestamp", timestamp);
  
    const seatData = new FormData();
    selectedSeats.forEach((seatNumber) => {
      seatData.append("seat_number[]", seatNumber);
    });
    seatData.append("schedule_showtime_id", scheduleshowtimeId);
  
    try {
      await createBooking(bookingData);
      await createSeat(seatData);
      
      alert("Booking successful!");
  
      navigate("/booking");
    } catch (errors) {
      console.error("Error:", errors);
      setErrors(errors.response?.data?.message || "Something went wrong");
    }
  };
  
  

  console.log(movie)
  console.log(studio)
  console.log(showtime)
  console.log(showdate)
  console.log(totalPrice)

  return (
    <div className="flex flex-col items-center justify-center dark:bg-gray-900 text-white w-full p-8 mt-24">
      <div className="w-full flex items-center justify-center">
        <div className="w-1/2 mb-4">
          <table className="w-full">
            <thead className="text-sm text-black uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-200 text-left">
              <tr>
                <th className="px-2 py-4">Movie</th>
                <th className="px-2 py-4">Studio</th>
                <th className="px-2 py-4">Time</th>
                <th className="px-2 py-4">Date</th>
                <th className="px-2 py-4">Price</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 dark:text-gray-400">
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-2 py-2">{movie.title}</td>
                <td className="px-2 py-2">{studio.name}</td>
                <td className="px-2 py-2">{showtime.slice(0, 5)}</td>
                <td className="px-2 py-2">{schedule.showdate}</td>
                <td className="px-2 py-2">{formatRupiah(movie.price)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <ul className="flex justify-between p-4 rounded">
        <li className="flex items-center mx-4 text-gray-900 dark:text-white">
          <div
            id="seat"
            className="bg-gray-600 h-[26px] w-[32px] m-[3px] rounded-t-[10px] text-[10px]"
          ></div>
          <small className="ml-2">Available</small>
        </li>
        <li className="flex items-center mx-4 text-gray-900 dark:text-white">
          <div
            id="seat-selected"
            className="bg-orange-500 h-[26px] w-[32px] m-[3px] rounded-t-[10px] text-[10px]"
          ></div>
          <small className="ml-2">Selected</small>
        </li>
        <li className="flex items-center mx-4 text-gray-900 dark:text-white">
          <div
            id="seat-sold"
            className="bg-gray-200 h-[26px] w-[32px] m-[3px] rounded-t-[10px] text-[10px]"
          ></div>
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
                {[...Array(8)].map((_, index) => {
                  const seatNumber = `${rowLabel}${index + 1}`;
                  const isBooked = seat.some((s) => s.seat_number.includes(seatNumber));


                  return (
                    <div
  key={index}
  className={`h-[26px] w-[32px] m-[3px] rounded-t-[10px] text-[10px] text-center transition-all duration-200
    ${
      isBooked
        ? "bg-gray-200 text-black cursor-not-allowed"
        : selectedSeats.includes(seatNumber)
        ? "bg-orange-500"
        : "bg-gray-700 hover:scale-110 cursor-pointer"
    }`}
  onClick={!isBooked ? () => handleSeatClick(seatNumber) : undefined}
>
  {seatNumber}
</div>


                  );
                })}
                <div className="mx-4 text-center text-black dark:text-white">
                  {rowLabel}
                </div>
                {[...Array(6)].map((_, index) => {
                  const seatNumber = `${rowLabel}${index + 10}`;
                  const isBooked = seat.some((s) => s.seat_number.includes(seatNumber));
                  return (
                    <div
  key={index}
  className={`h-[26px] w-[32px] m-[3px] rounded-t-[10px] text-[10px] text-center transition-all duration-200
    ${
      isBooked
        ? "bg-gray-200 text-black cursor-not-allowed"
        : selectedSeats.includes(seatNumber)
        ? "bg-orange-500"
        : "bg-gray-700 hover:scale-110 cursor-pointer"
    }`}
  onClick={!isBooked ? () => handleSeatClick(seatNumber) : undefined}
>
  {seatNumber}
</div>

                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center dark:bg-gray-900 text-white w-[687px] h-auto">
        <div className="flex w-full">
          <div className="flex dark:bg-gray-900 text-white w-1/2">
            <p className="flex text-center text-lg text-gray-900 dark:text-gray-200">
              Total Price: {formatRupiah(totalPrice)} (
              {selectedSeats.length > 0 ? selectedSeats.length : "0"} seats)
            </p>
          </div>
          <div className="flex flex-col dark:bg-gray-900 text-white items-left">
            <p className="flex text-lg text-gray-900 mr-4 dark:text-gray-200">
              Selected Seat:{" "}
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "No seats selected"}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={createBookingDetails}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
      >
        {/* <Link onChange={createBookingDetails} to={`/booking`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"></Link> */}
        Book Your Ticket
      </button>
    </div>
  );
}
