export default function Ticket() {
  return (
    <div className="max-w-xs mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-6">
      {/* <!-- Bagian Nama Film --> */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          The Pursuit Happines
        </h2>

        {/* <!-- Bagian Jadwal --> */}
        <p className="mt-2 text-sm text-gray-600">
          Jadwal: 3 Februari 2025, 19:00
        </p>

        {/* <!-- Status Booking --> */}
        <p className="mt-4 text-lg font-medium text-green-600">
          Sudah di Booking
        </p>

        {/* <!-- Barcode Sederhana --> */}
        <div className="mt-6">
          <div className="w-full h-8 bg-black mb-2"></div>
          {/* <!-- Representasi barcode sederhana dengan garis hitam --> */}
          <p className="text-xs text-gray-500">Barcode: 1234567890</p>
          {/* <!-- Menampilkan angka sebagai barcode --> */}
        </div>

        {/* <!-- Tombol untuk Info lebih lanjut --> */}
        {/* <div className="mt-4"> */}
        {/* <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
              Info Detail
            </button> */}
        {/* </div> */}
      </div>
    </div>
  );
}
