import { Link } from "react-router-dom";
import schedules from "../../../utils/constants/schedules";

export default function Schedules() {
  return (
    <>
      <div className="w-full">
        <div className="datatable-container">
            <Link to={`/admin/schedules/create`} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              <i className="fa-solid fa-plus mr-2"></i>
              Add Data
            </Link>
            
          <table className="table w-full table-auto datatable-table mt-4">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="py-4 px-2">
                    <div className="flex items-center gap-1.5">
                      <p>Photo</p>
                    </div>
                </th>
                <th className="py-4 px-2">
                    <div className="flex items-center gap-1.5">
                      <p>Title</p>
                    </div>
                </th>
                <th className="py-4 px-2">
                    <div className="flex items-center gap-1.5">
                      <p>Studio</p>
                    </div>
                </th>
                <th className="py-4 px-2">
                    <div className="flex items-center gap-1.5">
                      <p>Showtime</p>
                    </div>
                </th>
                <th className="py-4 px-2">
                    <div className="flex items-center gap-1.5">
                      <p>Controls</p>
                    </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => (
                <tr key={index} data-index={index} className="hover:bg-gray-50 border-b border-gray-200">
                  <td className="py-2"><img src={schedule.photo} alt={schedule.title} className="w-16 h-16 object-cover" /></td>
                  <td className="py-2">{schedule.title}</td>
                  <td className="py-2">{schedule.studio}</td>
                  <td className="py-2">{schedule.showtime}</td>
                  <td className="py-2">
                    <div className="flex items-center gap-4 mx-2">
                      <Link to={`/admin/schedules/edit/${schedule.id}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
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
    </>
  );
}
