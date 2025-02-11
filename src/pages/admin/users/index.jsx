import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../../services/user";


export default function AdminUsers() {
const [users, setGenres] = useState([]);
  const [Loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

useEffect(() => {
  
const fetchData = async () => {
  setLoading(true);
  setError(null);

  try {
    const [
      genresData,
    ] = await Promise.all( [
      getUsers(),
    ]);

    setGenres(genresData);
  
    }catch (error){
      setError("Failed to fetch data, please try again later : ")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  
    fetchData();
    
  }, []);





    
        return (

            <div className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div>
             <h1 className="text-2xl font-bold mb-4">Users</h1>
           </div>
           <Link
             to={"/admin/genres/create"}
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
           >
             <i className="fa-solid fa-plus mr-2"></i>
             Add Data
           </Link>
     
           <div className="max-w-full overflow-x-auto mt-4">
             <table className="w-full table-auto">
               <thead className="border-b bg-gray-50 text-white">
                 <tr className="bg-gray-2 text-left dark:bg-meta-4">
                   <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                     Name
                   </th>
                   <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                     Role
                   </th>
     
                   <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                     Action
                   </th>
                 </tr>
               </thead>
               <tbody>
                 {/* {genres.length > 0 ? (
                   genres.map((genre) => ( */}
                     {/* <tr key={genre.id} className="hover:bg-gray-50"> */}
                     <tr className="hover:bg-gray-50">
                       <td className="px-4 py-5 pl-9 xl:pl-11">
                         <h5 className="font-medium text-black dark:text-white">
                           {/* {genre.name} */}
                           Admin
                         </h5>
                       </td>
                       <td className="px-4 py-5">
                         <p className="text-black dark:text-white">
                           {/* {genre.description} */}
                           Admin
                         </p>
                       </td>
     
                       <td className="px-4 py-5">
                         <div className="flex items-center space-x-3.5">
                           {/* <Link to={`/admin/genres/edit/${genre.id}`}> */}
                           <Link to={"/admin/genres/edit/" }>
                             <i className="fa-solid fa-pen-to-square"></i>
                           </Link>
                           {/* <button onClick={() => handleDelete(genre.id)}> */}
                           <button>
                             <i className="fa-solid fa-trash"></i>
                           </button>
                         </div>
                       </td>
                     </tr>
                   {/* )) */}
                 {/* ) : ( */}
                   {/* <p>Tidak ada data Genre</p> */}
                 {/* )} */}
               </tbody>
             </table>
           </div>
         </div>

          

        );
}