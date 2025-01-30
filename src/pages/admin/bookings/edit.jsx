import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBooking, updateBooking } from "../../../services/booking";


export default function BookingEdit() {

  

    // menanpilkan error 
    const [errors, setErrors] = useState({})
  
    // ini dari masing masing,
    const [user_id, setUser_id] = useState("");
    const [schedule_id, setSchedule_id] = useState("");
    const [quantity, setQuantity] = useState("");
    const [booking_date, setBooking_Date] = useState("");
    // destruct id dari URL
    const {id} = useParams()
    
    const navigate = useNavigate()
  
  
    // kita coba fetch data buku berdasarkan ID
    const fetchBookingDetails = async () =>{
      // dari sini kita ambil data nya dari sevices getBooks
  
      // getBooks ini kita masukan ke dalam variable nama nya data
      const data = await getBooking();    // getBooks() mengambil semua data buku
  
  
      // kita coba, cari data buku berdasarkan id
      const booking = data.find(book => book.id === parseInt(id));
      // console.log(book)
      if(booking){
        // assign data to state (ini setter function  nya yang di pakai)
        setUser_id(booking.user_id)  // ini format nya object json pakai titik
        setSchedule_id(booking.schedule_id)
        setQuantity(booking.quantity)
        setBooking_Date(booking.booking_date)
        
      } 
    }
  
  
  // untuk menjalakan fetch nya, kayka function biasa
    // fetchBookDetails()
  
    // lebih baik kita pakai useEffect
  
    useEffect(() =>{
      fetchBookingDetails()
    },[])
  
  
   
    
    //update book data
    // ini pakai async karena di service nya pakai async pada update
    // ini untuk ke form
    const updateBookingDetails =  async (e) =>{
      e.preventDefault()
  
    // di React untuk menampung data yang di edit, kita menggunakan nama nya FormData
    // bawaan React
  
    // buat FormData
    const bookingData = new FormData()
    
    // ini kita debug 
  // console.log(title);
  
    // title (sebelah kiri) ini sama kaya di database
    // titile (sebelah kanan) ini dari use state
      bookingData.append('user_id', user_id)
      bookingData.append('schedule_id', schedule_id)
      bookingData.append('quantity', quantity)
      bookingData.append('booking_date', booking_date)

      // ini kita tambahkan _method    put
        bookingData.append('_method', 'PUT')
  
  
  
      //ini untuk melakukan pengecekan
      // bookData.forEach((value, key) => {
      //   console.log(key, value)
      // })
  
      // ini updateBook ambil dari service books.js  
      await updateBooking(id, bookingData)
      // jika berhasil kita mau apa, kita pindah pakai navigate
      .then(() =>{
        //berhasil, kita redirect ke halaman index.
        navigate('/admin/bookings')
        // console.log(genreData)
      } )
      .catch((err) =>{
        // console.log(err)
        // console.log(err.response.data.mesaage)
        setErrors(err.response.data.message)
      })
    
    }

  return (

    <div className="flex flex-col gap-9">
      <div
        className="rounded-sm bg-white shadow-default dark:bg-boxdark"
      >
        <div
          className="border-b border-stroke px-6.5 py-4 dark:border-strokedark"
        >
          <h3 className="font-medium text-black dark:text-white">
            Edit Genres
          </h3>
        </div>
        <form onSubmit={updateBookingDetails}  className="py-5">
          <div className="p-6.5 flex flex-col gap-5">
            
            <div className="mb-4.5">
              <label
                className="mb-3 block text-base font-medium text-black dark:text-white"
              >
                user_id
              </label>
              
              {errors.user_id && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                    <span className="font-medium">{errors.user_id[0]}</span>
                </div>
              )}
              <input
                type="text"
                value={user_id}
                name="user_id"
                onChange={(e) => setUser_id(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              />
            </div>

            <div className="mb-4.5">
              <label
                className="mb-3 block text-base font-medium text-black dark:text-white"
              >
               schedule_id
              </label>
          
              {errors.schedule_id && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                    <span className="font-medium">{errors.schedule_id[0]}</span>
                </div>
              )}
             
              <textarea
                rows="6"
                value={schedule_id}
                name="schedule_id"
                onChange={(e) => setSchedule_id(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              ></textarea>
            </div>

            <div className="mb-4.5">
              <label
                className="mb-3 block text-base font-medium text-black dark:text-white"
              >
               quantity
              </label>
          
              {errors.quantity && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                    <span className="font-medium">{errors.quantity[0]}</span>
                </div>
              )}
             
              <textarea
                rows="6"
                value={quantity}
                name="quantity"
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              ></textarea>
            </div>

            <div className="mb-4.5">
              <label
                className="mb-3 block text-base font-medium text-black dark:text-white"
              >
               booking_date
              </label>
          
              {errors.booking_date && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                    <span className="font-medium">{errors.booking_date[0]}</span>
                </div>
              )}
             
              <textarea
                rows="6"
                value={booking_date}
                name="booking_date"
                onChange={(e) => setBooking_Date(e.target.value)}
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
  )
}
