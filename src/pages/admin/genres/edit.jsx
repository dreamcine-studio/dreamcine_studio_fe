import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenres, updateGenre } from "../../../services/genre";


export default function GenreEdit() {

  

    // menanpilkan error 
    const [errors, setErrors] = useState({})
  
    // ini dari masing masing,
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
  
  
    // destruct id dari URL
    const {id} = useParams()
    
    const navigate = useNavigate()
  
  
    // kita coba fetch data buku berdasarkan ID
    const fetchGenreDetails = async () =>{
      // dari sini kita ambil data nya dari sevices getBooks
  
      // getBooks ini kita masukan ke dalam variable nama nya data
      const data = await getGenres();    // getBooks() mengambil semua data buku
  
  
      // kita coba, cari data buku berdasarkan id
      const genre = data.find(book => book.id === parseInt(id));
      // console.log(book)
      if(genre){
        // assign data to state (ini setter function  nya yang di pakai)
        setName(genre.name)  // ini format nya object json pakai titik
        setDescription(genre.description)
        
      } 
    }
  
  
  // untuk menjalakan fetch nya, kayka function biasa
    // fetchBookDetails()
  
    // lebih baik kita pakai useEffect
  
    useEffect(() =>{
      fetchGenreDetails()
    },[])
  
  
   
    
    //update book data
    // ini pakai async karena di service nya pakai async pada update
    // ini untuk ke form
    const updateGenreDetails =  async (e) =>{
      e.preventDefault()
  
    // di React untuk menampung data yang di edit, kita menggunakan nama nya FormData
    // bawaan React
  
    // buat FormData
    const genreData = new FormData()
    
    // ini kita debug 
  // console.log(title);
  
    // title (sebelah kiri) ini sama kaya di database
    // titile (sebelah kanan) ini dari use state
      genreData.append('name', name)
      genreData.append('description', description)

      // ini kita tambahkan _method    put
      genreData.append('_method', 'PUT')
  
  
  
      //ini untuk melakukan pengecekan
      // bookData.forEach((value, key) => {
      //   console.log(key, value)
      // })
  
      // ini updateBook ambil dari service books.js  
      await updateGenre(id, genreData)
      // jika berhasil kita mau apa, kita pindah pakai navigate
      .then(() =>{
        //berhasil, kita redirect ke halaman index.
        navigate('/admin/genres')
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
        <form onSubmit={updateGenreDetails}  className="py-5">
          <div className="p-6.5 flex flex-col gap-5">
            
            <div className="mb-4.5">
              <label
                className="mb-3 block text-base font-medium text-black dark:text-white"
              >
                Name
              </label>
              
              {errors.name && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                    <span className="font-medium">{errors.name[0]}</span>
                </div>
              )}
              <input
                type="text"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              />
            </div>

            <div className="mb-4.5">
              <label
                className="mb-3 block text-base font-medium text-black dark:text-white"
              >
                Description
              </label>
          
              {errors.description && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                    <span className="font-medium">{errors.description[0]}</span>
                </div>
              )}
             
              <textarea
                rows="6"
                value={description}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
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
