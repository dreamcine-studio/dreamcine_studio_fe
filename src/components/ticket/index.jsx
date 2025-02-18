import { useEffect, useState } from "react";
import { useParams  } from "react-router-dom";
import Barcode from "react-barcode";
import { showPayment } from "../../services/payment";
import { showBooking } from "../../services/booking";
import { showScheduleShowtimes } from "../../services/scheduleshowtime";

export default function Ticket() {
  
  const [payment, setPayment] = useState([]);
  const [booking , setBooking] = useState([]);
  const [scheduleShowTime , setScheduleShowTime] = useState([]);


  
  const { id } = useParams(); // Menangkap ID dari URL

  // Menambahkan state untuk movie title
  const [movieTitle, setMovieTitle] = useState('');


  const fetchPaymentDetails = async () => {
    try {
      const data = await showPayment(id); 

      if (data) {
        setPayment(data);
      }
    } catch (error) {
      console.error("Error fetching payment details", error);
    }
  };




  const fetchPaymentBooking = async () => {

    try {

      const data = await showScheduleShowtimes(payment.booking.id); // Ambil data booking menggunakan payment_method_id
      if (data) {
        setBooking(data); // Set data booking ke state booking
      }
    } catch (error) {
      console.error("Error fetching booking details", error);
    }
  };





  // Mengambil data saat pertama kali load dan saat ID berubah
  useEffect(() => {
    fetchPaymentDetails();
    
    // Ambil movie title dari sessionStorage
    const storedMovieTitle = sessionStorage.getItem("movie_title");
    setMovieTitle(storedMovieTitle || "Movie Title Not Available");
  }, [id]); // Hanya dipanggil saat ID berubah


  useEffect(() => {
    if (payment && payment.schedule_id) {
      fetchPaymentBooking(); // Panggil fetchBookings ketika payment sudah terisi
    }
  }, [scheduleShowTime]); // Trigger jika payment berubah






  console.log("payment" , payment);
  console.log("payment_Booking" , payment.booking_id);
  console.log("schedule_id" , payment.schedule_id);

  // console.log("payment_Booking_schedule-id" , payment.booking.schedule_id);
  // console.log("scheuleShotime" , scheduleShowTime);
  

  // Jika data belum tersedia, tampilkan loading
  if (!payment.payment_code || !payment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-2xl p-8 pt-12 mt-8">
      {/* Bagian Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">Cinema Ticket</h2>
        <p className="mt-2 text-gray-500 text-lg">{movieTitle}</p> {/* Menampilkan Movie Title */}
      </div>

      {/* Bagian Detail Pembayaran dan Film */}
      <div className="mt-6">
        <div className="text-center space-y-6">
          {/* Menampilkan Status Pembayaran */}
          <div className="flex justify-between items-center text-gray-700 mb-4">
            <p className="text-sm font-medium">Payment Status</p>
            <p className="font-semibold text-lg">{payment.status || "N/A"}</p>
          </div>

      {/* Menampilkan Payment Date */}
        <div className="flex justify-between items-center text-gray-700 mb-4">
            <p className="text-sm font-medium">Payment Date</p>
            <p className="font-semibold text-lg">{payment.booking.amount || "Not Available"}</p>
          </div>


          {/* Menampilkan Payment Date */}
          <div className="flex justify-between items-center text-gray-700 mb-4">
            <p className="text-sm font-medium">Payment Date</p>
            <p className="font-semibold text-lg">{payment.payment_date || "Not Available"}</p>
          </div>

          {/* Menampilkan Barcode hanya jika status "confirmed" */}
          <div className="mt-6">
            {payment.status === "confirmed" ? (
              <Barcode className="mx-auto text-xl text-gray-800" value={payment.payment_code} />
            ) : (
              <p className="text-gray-500">Tiket belum tersedia. Status pembayaran: {payment.status}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}