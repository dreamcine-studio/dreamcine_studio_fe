import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteGenre, getGenres } from "../../../services/genre";
// import { useEffect, useState } from "react";
// import { getGenres } from "../../../services/genre";

export default function AdminGenres() {

    const [genres, setGenres] = useState([]);

    useEffect(() => {  
      const fetchGenres = async () => {  
        const data = await getGenres();  
        setGenres(data);  
      };  
    
      fetchGenres();  
    }, []);
  
    console.log("ada",genres)



    const handleDelete = async (id) => {
      // deleteBook dari services jangan lupa di inport
     const confirmDelete =  window.confirm("Apakah Anda yakin ingin Menghapus Data ini ?");
  
     if(confirmDelete){
        await deleteGenre(id)
  
      // ini kita update pakai setter Books
      setGenres(genres.filter(genre => genre.id !== id))
      }
    }


  return (
    <div
      className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1"
    >
      <Link to={"/admin/genres/create"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Tambah data</Link>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="border-b bg-gray-50 text-white">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th
                className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11"
              >
                Name
              </th>
              <th
                className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white"
              >
                description
              </th>
           
              <th
                className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white"
              >
                Action
              </th>

            </tr>
          </thead>
          <tbody>

     
     
          {genres.length > 0 ?
           genres.map((genre) => (
            <tr key={genre.id} className="hover:bg-gray-50">
              <td
                className="px-4 py-5 pl-9 xl:pl-11"
              >
                <h5 className="font-medium text-black dark:text-white">{genre.name}</h5>
         
              </td>
              <td className="px-4 py-5">
                <p className="text-black dark:text-white">{genre.description}</p>
              </td>

          
              <td className="px-4 py-5">
                <div className="flex items-center space-x-3.5">
                  {/* <Link to="/admin/genres/create"><i className="fa-solid fa-plus"></i></Link> */}
                  <Link to={`/admin/genres/edit/${genre.id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                  <button onClick={ () =>  handleDelete(genre.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>


)): (
  <p>Tidak ada data Genre</p>
)}
     
             

          </tbody>
        </table>
      </div>
    </div>
  )
}