import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudio } from "../../../services/studios";


export default function StudioCreate() {

  

  const[errors, setErrors] = useState({})

  const [studioData, setGenreData] = useState({
    name: "",
    location: "",
    maxseats: ""
  })

  const navigate = useNavigate();
  

  // di sini kita kasih Handle
// Handle input change
const handleInputChange = (event) => {
  // ini kita destructoring, name adalah properti di HTML, value tempat ngirim data ke server
  // kalau di Postmane itu nama nya Key
  // value itu di Postman itu value juga
  const {name, value} = event.target
  setGenreData({...studioData, [name]: value});
}


const studioGenre = async (e) => {
  e.preventDefault()


 // ini nama objec nya, bebas, berfungsi untuk menambahkan data
  const formDataToSendGenre = new FormData()

  formDataToSendGenre.append('name', studioData.name)
  formDataToSendGenre.append('location', studioData.location)
  formDataToSendGenre.append('maxseats', studioData.maxseats)


  // biar lebih bagus kita bisa pakai try catch
  try{
      await createStudio(formDataToSendGenre);
      navigate('/admin/studios')
  }catch(error){
 
    setErrors(error.response.data.message)
  }
}

console.log(studioData)



    return (
      <div className="flex flex-col gap-9">
        <div
          className="rounded-sm bg-white shadow-default dark:bg-boxdark"
        >
          <div
            className="border-b border-stroke px-6.5 py-4 dark:border-strokedark"
          >
            <h3 className="font-medium text-black dark:text-white">
            Create Studios
            </h3>
          </div>
          <form onSubmit={studioGenre}  className="py-5">
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
                   name="name"
                value={studioData.name}
                onChange={handleInputChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
                />
              </div>


  
              <div className="mb-4.5">
                <label
                  className="mb-3 block text-base font-medium text-black dark:text-white"
                >
                  Location
                </label>
                {errors.location && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                    <span className="font-medium">{errors.location[0]}</span>
                </div>
              )}
                
                <input
                  type="text"
                  name="location"
                  value={studioData.location}
                  onChange={handleInputChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
                />
              </div>


              <div className="mb-4.5">
                <label
                  className="mb-3 block text-base font-medium text-black dark:text-white"
                >
                  Max Seat
                </label>
                {errors.maxseats && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                    <span className="font-medium">{errors.maxseats[0]}</span>
                </div>
              )}

                
                <textarea
                  rows="6"
                  name="maxseats"
                  value={studioData.maxseats}
                  onChange={handleInputChange}
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
  