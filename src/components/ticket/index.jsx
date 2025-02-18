import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Barcode from "react-barcode";
import { showPayment } from "../../services/payment";
import { getBooking, showBooking } from "../../services/booking";
import { getScheduleShowtimes, showScheduleShowtimes } from "../../services/scheduleshowtime";
import { getSchedules } from "../../services/schedules";
import { getMovies } from "../../services/movies";
// import { showSchedule } from "../../services/schedule";
// import { showMovie } from "../../services/movie"; // Import service untuk fetch movie


export default function Ticket() {
  const { id } = useParams(); // Menangkap ID dari URL
  const [payment, setPayment] = useState(null);
  const [booking, setBooking] = useState(null);
  const [scheduleShowtimes, setScheduleShowTimes] = useState(null);
  const [schedule, setScheduleS] = useState(null);
  const [movies, setMovies] = useState(null);
  const [movieTitle, setMovieTitle] = useState("Loading...");
  const [loading, setLoading] = useState(true); // Tambahkan state loading
  const [error, setError] = useState(null); // Tambahkan state error




 useEffect(() => {
  
    const fetchData = async () => {
      setLoading(true);
      setError(null);
    
      try {
        const [
          paymentData,
          bookingData,
          scheduleShowTimeData,
          schedulesData,
          movieData
          
        ] = await Promise.all( [
          showPayment(id),
          getBooking(),
          getScheduleShowtimes(),
          getSchedules(),
          getMovies()
        ]);

        
    
        setPayment(paymentData);
        setBooking(bookingData);
        setScheduleShowTimes(scheduleShowTimeData),
        setScheduleS(schedulesData),
        setMovies(movieData)
      
            // Menentukan judul film jika movies ada
      if (movieData && movieData.length > 0) {
        // Misalnya kita ambil film pertama dalam array
        setMovieTitle(movieData[1].title);
      } else {
        setMovieTitle("Movie Not Available");
      }

        }catch (error){
          setError("Failed to fetch data, please try again later : ")
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
      

    fetchData();
    
  }, []);

// console.log("Payment", payment);
// console.log("booking", booking);
// console.log("scheduleShowtimes", scheduleShowtimes);
// console.log("schedule", schedule);
// console.log("movies", movies);



  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-2xl p-8 pt-12 mt-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">Cinema Ticket</h2>
        {/* <p className="mt-2 text-gray-500 text-lg">{movies.title || "Movie Not Yet"}</p> */}
        <p className="mt-2 text-gray-500 text-lg">{movieTitle}</p>
      </div>

      <div className="mt-6">
        <div className="text-center space-y-6">
          <div className="flex justify-between items-center text-gray-700 mb-4">
            <p className="text-sm font-medium">Payment Status</p>
            <p className="font-semibold text-lg">{payment.status || "N/A"}</p>
          </div>

          <div className="flex justify-between items-center text-gray-700 mb-4">
            <p className="text-sm font-medium">Payment Date</p>
            <p className="font-semibold text-lg">{payment.payment_date || "Not Available"}</p>
          </div>

          <div className="mt-6">
            {payment.status === "confirmed" && payment.payment_code ? (
              <Barcode className="block mx-auto text-xl text-gray-800" value={String(payment.payment_code)} />
            ) : (
              <p className="text-gray-500">
                Tiket belum tersedia. Status pembayaran: {payment.status}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}