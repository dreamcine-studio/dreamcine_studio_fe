import { Link } from "react-router-dom";
import schedules from "../../../utils/constants/schedules";


export default function Schedules() {
  return (
    <>
      <div className="w-full">
        <h1 className="text-4xl text-center font-bold mb-4">Schedules</h1>

        <div className="w-full p-4 mb-4">
          <Link
            to="/admin/schedules/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Data
            <i className="fa-solid fa-plus pl-4"></i>
          </Link>

          <div className="container mt-4 mx-auto grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {schedules.map((schedule) => (
              <div className="h-full flex flex-col">
                <div
                  href="#"
                  className="flex flex-col sm:flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 :border-gray-700 :bg-gray-800 :hover:bg-gray-700 h-full"
                >
                  <img
                    className="object-cover w-full sm:w-48 sm:h-40 rounded-t-lg sm:rounded-none sm:rounded-l-lg h-40 md:h-56 md:w-40"
                    src={schedule.photo}
                    alt=""
                  />

                  <div className="flex flex-col justify-between p-4 leading-normal flex-grow">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 :text-white">
                      {schedule.title}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 :text-gray-400">
                      <b>{schedule.studio}</b>
                    </p>
                    <p className="mb-3 font-normal text-gray-700 :text-gray-400">
                      {schedule.showtime}
                    </p>
                    <div className="flex justify-end gap-4 mx-4">
                      <Link className="" to="/admin/schedules/edit">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))};
            </div>
        </div>
      </div>
    </>
  );
}
