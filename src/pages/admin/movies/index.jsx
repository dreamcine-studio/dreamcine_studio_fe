import { Link } from "react-router-dom"
import movies from "../../../utils/constants/Movies"

export default function Movies() {
  return (
    <div
      className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1"
    >
      <Link to={"/admin/books/create"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Tambah data</Link>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="border-b bg-gray-50 text-white">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th
                className=" px-4 py-4 font-medium text-black dark:text-white xl:pl-11"
              >
                Title
              </th>
              <th
                className=" px-4 py-4 font-medium text-black dark:text-white"
              >
                Description
              </th>
              <th
                className=" px-4 py-4 font-medium text-black dark:text-white"
              >
                Poster
              </th>
              <th
                className=" px-4 py-4 font-medium text-black dark:text-white"
              >
                Price
              </th>
              <th
                className=" px-4 py-4 font-medium text-black dark:text-white"
              >
                Cast
              </th>
              <th
                className=" px-4 py-4 font-medium text-black dark:text-white"
              >
                Genre
              </th>
              <th
                className=" px-4 py-4 font-medium text-black dark:text-white"
              >
                Duration
              </th>
              <th
                className=" px-4 py-4 font-medium text-black dark:text-white"
              >
                Release_date
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>

          {movies.map((movie) => ( 
            <tr key={movie.id} className="hover:bg-gray-50">
              <td
                className="px-4 py-5 pl-9 xl:pl-11"
              >
                <h5 className="font-medium text-black dark:text-white">{movie.title}</h5>
              </td>
              <td className="px-4 py-5">
                <p className="text-black dark:text-white">{movie.description}</p>
              </td>
              <td className="px-4 py-5">
                <img src={movie.poster}/>
              </td>
              <td className="px-4 py-5">
                <p className="text-black dark:text-white">{movie.price}</p>
              </td>
              <td className="px-4 py-5">
                <p className="text-black dark:text-white">{movie.cast}</p>
              </td>
              <td className="px-4 py-5">
                <p className="text-black dark:text-white">{movie.genre}</p>
              </td>
              <td className="px-4 py-5">
                <p className="text-black dark:text-white">{movie.duration}</p>
              </td>
              <td className="px-4 py-5">
                <p className="text-black dark:text-white">{movie.release_date}</p>
              </td>
              <td className="px-4 py-5">
                <div className="flex items-center space-x-3.5">

                  <Link to="/admin/books/edit"><i className="fa-solid fa-pen-to-square"></i></Link>
                  <button >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>  
              </td>
            </tr>
            ))} 
          </tbody>
        </table>
      </div>
      
    </div>
  )
}