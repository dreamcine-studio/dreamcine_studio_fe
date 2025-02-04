import { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { getPaymentmethods } from "../../services/paymentMethod";
import { getSchedules } from "../../services/schedules";
import { getMovies } from "../../services/movies";
import payments from "../../utils/constants/payment";

export default function Ticket() {
  const [Movies, setmovies] = useState([]);
  const [Schedules, setSchedules] = useState([]);
  const [Payments, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies();
      setmovies(data); // Menyimpan data movies ke state
    };

    const fetchSchedules = async () => {
      const data = await getSchedules();
      setSchedules(data);
    };

    const fetchPaymentMethods = async () => {
      const data = await getPaymentmethods();
      setPaymentMethods(data);
    };

    fetchMovies();
    fetchSchedules();
    fetchPaymentMethods();
  }, []);

  // Pastikan data Movies ada sebelum mencoba untuk menampilkan nama film
  const movieName = Movies.length > 0 ? Movies[0].title : "Default Movie Title"; // Menampilkan nama film pertama jika ada


  // const scheduleTime = Payments.length > 0 ? Payments[0].payment_code : "Default Movie Title"; // Menampilkan nama film pertama jika ada
  // const scheduleDate = Schedules.length > 0 ? Schedules[0].showdate_start : "Default Movie Title"; // Menampilkan nama film pertama jika ada

  // Pastikan paymentMethods ada sebelum digunakan
  const paymentStatus = payments.length > 0 ? payments[0].status: "default_payment_method";
  const paymentDate = payments.length > 0 ? payments[0].payment_date: "default_payment";

  return (
    // ini data nya di ambil dari payment

    <div className="max-w-xs mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-6">
      {/* <!-- Bagian Nama Film --> */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">{movieName}</h2> {/* Menampilkan nama film */}
        
        
        {/* <!-- Bagian Jadwal --> */}
        <p className="mt-2 text-sm text-gray-600">{paymentDate}</p>
        

        {/* <!-- Status Booking --> */}
        <p className="mt-4 text-lg font-medium text-green-600">{paymentStatus}</p>
        
        {/* <!-- Barcode Sederhana --> */}
        <div className="mt-6">
          <div>
            {/* Menampilkan barcode dengan value yang diambil dari paymentMethods */}
            
            <Barcode className="ml-12 mt-4 text-lg font-medium text-green-600 text-right" value={"tess"} />

          </div>
        </div>
      </div>
    </div>
  );
}