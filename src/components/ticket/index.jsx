import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Barcode from "react-barcode";
import { getPayments } from "../../services/payment";


export default function Ticket() {
  const [paymentCodes, setPaymentCodes] = useState('');
  const [paymentDates, setPaymentDates] = useState('');
  const [payments, setPayments] = useState('');

  const { id } = useParams(); // Menangkap ID dari URL

  // Fungsi untuk mengambil detail pembayaran berdasarkan ID
  const fetchPaymentDetails = async () => {
    try {
      const data = await getPayments(); // Mendapatkan data pembayaran dari API
      const payment = data.find((payment) => payment.id === parseInt(id)); // Mencari berdasarkan ID


      if (payment) {
        // Menyimpan data yang ditemukan ke state
        setPaymentCodes(payment.payment_code);
        setPaymentDates(payment.payment_date);
        setPayments(payment.status);  // status pembayaran (misalnya: "pending" atau "confirmed")
      }
    } catch (error) {
      console.error("Error fetching payment details", error);
    }
  };



  // Mengambil data saat pertama kali load dan saat ID berubah
  useEffect(() => {
    fetchPaymentDetails();
  }, [id]); // Hanya dipanggil saat ID berubah

  // Jika data belum tersedia, tampilkan loading
  if (!paymentCodes || !payments) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-2xl p-8 pt-12 mt-8">
      {/* Bagian Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">Cinema Ticket</h2>
        <p className="mt-2 text-gray-500 text-lg">Your Movie Experience Begins Here</p>
      </div>

      {/* Bagian Detail Pembayaran dan Film */}
      <div className="mt-6">
        <div className="text-center space-y-6">
          {/* Menampilkan Status Pembayaran */}
          <div className="flex justify-between items-center text-gray-700 mb-4">
            <p className="text-sm font-medium">Payment Status</p>
            <p className="font-semibold text-lg">{payments || "N/A"}</p>
          </div>

          {/* Menampilkan Payment Date */}
          <div className="flex justify-between items-center text-gray-700 mb-4">
            <p className="text-sm font-medium">Payment Date</p>
            <p className="font-semibold text-lg">{paymentDates || "Not Available"}</p>
          </div>

          {/* Menampilkan Barcode hanya jika status "confirmed" */}
          <div className="mt-6">
            {payments === "confirmed" ? (
              <Barcode className="mx-auto text-xl text-gray-800" value={paymentCodes} />
            ) : (
              <p className="text-gray-500">Tiket belum tersedia. Status pembayaran: {payments}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}