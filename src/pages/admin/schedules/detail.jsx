import React from "react";

export default function ScheduleList() {
  // Fungsi untuk menghasilkan daftar tanggal dari rentang yang diberikan
  function generateSchedule(start, end) {
    const result = [];
    const startParts = start.split("-").reverse().join("-");
    const endParts = end.split("-").reverse().join("-");

    let currentDate = new Date(startParts);
    const endDate = new Date(endParts);

    while (currentDate <= endDate) {
      const formattedDate = currentDate
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("-");
      result.push({
        date: formattedDate,
        times: ["08:00", "13:00", "18:00"], // Contoh time slots
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  }

  const startDate = "25-01-2025";
  const endDate = "12-02-2025";
  const schedules = generateSchedule(startDate, endDate);

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
          {schedules.map((item, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{item.date}</td>
              <td className="border p-2">{item.times.join(" | ")}</td>
              <td className="border p-2">
                <button className="mr-2 text-blue-500 hover:underline">✏️ Edit</button>
                <button className="text-red-500 hover:underline">🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
