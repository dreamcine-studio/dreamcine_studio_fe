import { Link } from "react-router-dom";
import genres from "../../../utils/constants/genres";
// import { useEffect, useState } from "react";
// import { getGenres } from "../../../services/genre";

export default function GenreMovies() {

    

  return (
    <div
      className="rounded-sm shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1"
    >
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

     
            {genres.map((genre) => ( 
            <tr key={genre.id} className="hover:bg-gray-50">
            {/* <tr  className="hover:bg-gray-50"> */}
              <td
                className="px-4 py-5 pl-9 xl:pl-11"
              >
                <h5 className="font-medium text-black dark:text-white">{genre.name}</h5>
                {/* <h5 className="font-medium text-black dark:text-white">Name</h5> */}
         
              </td>
              <td className="px-4 py-5">
                <p className="text-black dark:text-white">{genre.description}</p>
                {/* <p className="text-black dark:text-white">Description</p> */}
              </td>



          
              <td className="px-4 py-5">
                <div className="flex items-center space-x-3.5">
                  <Link to="/admin/genres/create"><i className="fa-solid fa-plus"></i></Link>
                  {/* <Link to={`/admin/genres/edit/${genre.id}`}><i className="fa-solid fa-pen-to-square"></i></Link> */}
                  <Link to={`/admin/genres/edit/${genre.name}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                  {/* <button onClick={ () =>  handleDelete(genre.id)}> */}
                  <button>
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