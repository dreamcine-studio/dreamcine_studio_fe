import { useEffect, useState } from "react";
import { getUsers } from "../../../services/user";
// import { Link } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);  
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); 
    
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const userData = await getUsers();
        // Memfilter data untuk mengecualikan user dengan role 'Admin'
        const filteredUsers = userData.filter(user => user.role !== 'Admin');
        setUsers(filteredUsers);
      } catch (error) {
        setError("Failed to fetch data, please try again later.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
    }
  }, [location]);

  if (loading) {
    return (
      <main className="py-6 px-12 space-y-2 bg-gray-300 min-h-screen w-full flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 border-4 border-solid border-transparent rounded-full animate-spin border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-pink-500"></div>
          <div className="text-2xl font-bold text-gray-800 animate-bounce">Please Wait ..</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="py-6 px-12 space-y-2 bg-gray-100 min-h-screen w-full flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-500">{error} ..</div>
      </main>
    );
  }



  return (
    <div className="space-y-2 min-h-screen w-full rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div>
        <h1 className="text-2xl text-center font-bold dark:text-white">User</h1>
      </div>

      {/* Pesan Sukses setelah Penghapusan */}
      {successMessage && (
        <div className="bg-green-500 text-white p-4 rounded-md text-center">
          {successMessage}
        </div>
      )}

      <div className="max-w-full overflow-x-auto mt-4">
        <table className="w-full table-auto mt-6">
          <thead className="border-b bg-gray-50 dark:bg-gray-900 text-white">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] px-4 py-4 font-bold text-gray-700 dark:text-white xl:pl-11 uppercase">Name</th>
              <th className="min-w-[220px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">Role</th>
              <th className="min-w-[220px] px-4 py-4 font-bold text-gray-700 dark:text-white uppercase">Email</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-4 py-5 pl-9 xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">{user.name}</h5>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">{user.role}</p>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">{user.email}</p>
                  </td>
                  
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">Tidak ada data pengguna</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}