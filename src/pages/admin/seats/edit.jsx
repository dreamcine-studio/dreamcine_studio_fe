import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSeats, updateSeat } from "../../../services/seat";

export default function SeatEdit() {
  // menanpilkan error
  const [errors, setErrors] = useState({});

  // ini dari masing masing,
  const [studio_id, setStudio_id] = useState("");
  const [seat_number, setseat_number] = useState("");
  const [isbooked, setisbooked] = useState("");

  // destruct id dari URL
  const { id } = useParams();

  const navigate = useNavigate();

  
  useEffect(() => {
    // kita coba fetch data buku berdasarkan ID
  const fetchSeatsDetails = async () => {
    // dari sini kita ambil data nya dari sevices getBooks

    // getBooks ini kita masukan ke dalam variable nama nya data
    const data = await getSeats(); // getBooks() mengambil semua data buku

    // kita coba, cari data buku berdasarkan id
    const seat = data.find((book) => book.id === parseInt(id));
    // console.log(book)
    if (seat) {
      // assign data to state (ini setter function  nya yang di pakai)
      setStudio_id(seat.studio_id); // ini format nya object json pakai titik
      setseat_number(seat.seat_number);
      setisbooked(seat.isbooked);
    }
  };

  // untuk menjalakan fetch nya, kayka function biasa
  // fetchBookDetails()

  // lebih baik kita pakai useEffect

    fetchSeatsDetails();
  }, []);
  

  //update book data
  // ini pakai async karena di service nya pakai async pada update
  // ini untuk ke form
  const updateSeatsDetails = async (e) => {
    e.preventDefault();

    // di React untuk menampung data yang di edit, kita menggunakan nama nya FormData
    // bawaan React

    // buat FormData
    const seatData = new FormData();

    // ini kita debug
    // console.log(title);

    // title (sebelah kiri) ini sama kaya di database
    // titile (sebelah kanan) ini dari use state
    seatData.append("studio_id", studio_id);
    seatData.append("seat_number", seat_number);
    seatData.append("isbooked", isbooked);

    // ini kita tambahkan _method    put
    seatData.append("_method", "PUT");

    //ini untuk melakukan pengecekan
    // bookData.forEach((value, key) => {
    //   console.log(key, value)
    // })

    // ini updateBook ambil dari service books.js
    await updateSeat(id, seatData)
      // jika berhasil kita mau apa, kita pindah pakai navigate
      .then(() => {
        //berhasil, kita redirect ke halaman index.
        navigate("/admin/seats");
        // console.log(genreData)
      })
      .catch((err) => {
        // console.log(err)
        // console.log(err.response.data.mesaage)
        setErrors(err.response.data.message);
      });
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Edit Seats
          </h3>
        </div>
        <form onSubmit={updateSeatsDetails} className="py-5">
          <div className="p-6.5 flex flex-col gap-5">
            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                studio_id
              </label>
              {errors.studio_id && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.studio_id[0]}</span>
                </div>
              )}

              <input
                type="text"
                name="studio_id"
                value={studio_id}
                onChange={(e) => setStudio_id(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                seat_number
              </label>
              {errors.seat_number && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.seat_number[0]}</span>
                </div>
              )}

              <input
                type="text"
                name="seat_number"
                value={seat_number}
                onChange={(e) => setseat_number(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                isbooked
              </label>
              {errors.isbooked && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.isbooked[0]}</span>
                </div>
              )}

              <textarea
                rows="6"
                name="isbooked"
                value={isbooked}
                onChange={(e) => setisbooked(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-indigo-600 p-3 font-medium text-white hover:bg-opacity-90"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
