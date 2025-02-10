import React, { useEffect, useState } from "react";
import { showSchedules } from "../../../services/schedules";
import { Link, useParams } from "react-router-dom";

export default function ScheduleList() {
  const { id } = useParams();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await showSchedules(id);
        console.log("Fetched Data:", data);
        
        const scheduleArray = Array.isArray(data) ? data : [data];
        setSchedules(generateSchedule(scheduleArray));
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, [id]);

  function generateSchedule(data) {
    if (!Array.isArray(data)) return [];
    const result = [];

    data.forEach((schedule) => {
      if (!schedule.showdate_start || !schedule.showdate_end) return;

      let currentDate = new Date(schedule.showdate_start);
      const endDate = new Date(schedule.showdate_end);

      while (currentDate <= endDate) {
        const formattedDate = currentDate.toISOString().split("T")[0];

        result.push({
          id: schedule.id,
          date: formattedDate,
          showtime: Array.isArray(schedule.showtime) ? schedule.showtime : [],
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return result;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Schedule List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.length > 0 ? (
            schedules.map((schedule, index) => (
              <tr key={index} className="border">
                <td className="border p-2">{schedule.date}</td>
                <td className="border p-2">
                  {schedule.showtime && schedule.showtime.length > 0 ? (
                    schedule.showtime.map((time, timeIndex) => (
                      <div
                        key={`${schedule.id}-${timeIndex}`}
                        className="bg-gray-200 text-gray-800 py-1 px-3 rounded-lg text-sm inline-block mx-1"
                      >
                        {time}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No showtimes available</div>
                  )}
                </td>
                <td className="border p-2">

                  <Link to={`/admin/schedules/edit/${schedule.id}`}
                  className="mx-4">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button onClick={() => handleDelete(schedule.id)}
                    >
                        <i className="fa-solid fa-trash"></i>
                      </button>
               
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No schedules available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
