import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Barcode from "react-barcode";
import { showPayment } from "../../../services/payment";
import { getBooking } from "../../../services/booking";
import { getScheduleShowtimes } from "../../../services/scheduleshowtime";
import { getSchedules } from "../../../services/schedules";
import { getMovies } from "../../../services/movies";


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
          
        ] = await Promise.all( [  //untuk mengeksekusi beberapa request data secara bersamaan,
          showPayment(id),
          getBooking(),
          getScheduleShowtimes(),
          getSchedules(),
          getMovies()
        ]);

        
        //Setelah data berhasil diambil, fungsi ini akan mengupdate state dengan data yang diterima
        setPayment(paymentData); //untuk menyimpan data pembayaran.
        setBooking(bookingData);
        setScheduleShowTimes(scheduleShowTimeData),
        setScheduleS(schedulesData),
        setMovies(movieData)

      
      
      if (paymentData && paymentData.booking_id) {    // Mengecek apakah data payment ditemukan, dan apakah ada Data booking_id pada data tersebut
        const relatedBooking = bookingData.find(b => b.id === paymentData.booking_id);     // jika data booking_id ditemukan , mencari data booking berdasarkan id
    
        if (relatedBooking && relatedBooking.schedule_showtime_id) {
          const relatedShowtime = scheduleShowTimeData.find(st => st.id === relatedBooking.schedule_showtime_id);
          
          if (relatedShowtime && relatedShowtime.schedule_id) {
            const relatedSchedule = schedulesData.find(s => s.id === relatedShowtime.schedule_id);
            
            if (relatedSchedule && relatedSchedule.movie_id) {
              const relatedMovie = movieData.find(m => m.id === relatedSchedule.movie_id);
              
              if (relatedMovie) { // jika data film ditemukan , akan mengatur judul film
                setMovieTitle(relatedMovie.title);
              } else {
                setMovieTitle("Movie Not Available");
              }
            }
          }
        }
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




  if (loading) {
    return (
      <main className="py-6 px-12 space-y-2 bg-gray-300 min-h-screen w-full flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 border-4 border-solid border-transparent rounded-full animate-spin border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-pink-500"></div>
          <div className="text-2xl font-bold text-gray-800 animate-bounce">Please Wait ..</div>
        </div>
      </main>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-2xl p-8 pt-12 mt-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">Cinema Ticket</h2>
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