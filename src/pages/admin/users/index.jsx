import { useEffect, useState } from "react";
import { deleteUsers, getUsers } from "../../../services/user";
import { Link } from "react-router-dom";


export default function AdminUsers() {

  const [users, setUsers] = useState([]);  
    
    useEffect(() => {  
      const fetchUser = async () => {  
        const data = await getUsers();  
        console.log(data);
        
        setUsers(data);  
      };  
    
      fetchUser();  
    }, []);
  
    console.log(users)
    

     const handleDelete = async (id) => {
        // deleteBook dari services jangan lupa di inport
       const confirmDelete =  window.confirm("Apakah Anda yakin ingin Menghapus Data ini ?");
    
       if(confirmDelete){
          await deleteUsers(id)
    
        // ini kita update pakai setter Books
        setUsers(users.filter(user => user.id !== id))
        }
      }
    

  return (
    <div className="space-y-2 min-h-screen w-full rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div className="flex items-center gap-6 justify-start">
      <h1 className="text-2xl text-center font-bold dark:text-white">User</h1>
      <Link
        to={"/admin/users/create"}
        className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        <i className="fa-solid fa-plus mr-2"></i>
        Add Data
      </Link>
    </div>

   

    <div className="max-w-full overflow-x-auto mt-4">
      <table className="w-full table-auto mt-6">
        <thead className="border-b bg-gray-50 dark:bg-gray-900 text-white">
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[150px] px-4 py-4 font-bold text-gray-700 dark:text-white xl:pl-11 uppercase">
              Name
            </th>
            <th className="min-w-[220px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
              Role
            </th>
            <th className="min-w-[220px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
              Email
            </th>
            <th className="min-w-[220px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
             {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}  className="hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-4 py-5 pl-9 xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {user.name}
                      {/* Fikri */}
                    </h5>
                  </td>
                  <td className="px-4 py-5">
                    {/* <p className="text-black dark:text-white">{genre.description}</p> */}
                    {/* <p className="text-black dark:text-white">Customer</p> */}
                    <p className="text-black dark:text-white">{user.role}</p>
                  </td>

                  <td className="px-4 py-5">
                    {/* <p className="text-black dark:text-white">{genre.description}</p> */}
                    <p className="text-black dark:text-white">{user.email}</p>
                  </td>

                  <td className="px-4 py-5">
                    <div className="flex items-center space-x-3.5">
                      {/* <Link to={`/admin/genres/edit/${genre.id}`}> */}
                      <Link to={`/admin/users/edit/`}>
                        <i className="fa-solid fa-pen-to-square text-yellow-500"></i>
                      </Link>
                      {/* <button onClick={() => handleDelete(genre.id)}> */}
                      <button >
                        <i className="fa-solid fa-trash text-red-700 dark:text-red-500"></i>
                      </button>
                    </div>
                  </td>
                </tr>
               ))
              ) : (
                <p>Tidak ada data Genre</p>
              )}
          </tbody>
 
      </table>
    </div>


  </div>
  )
}