
export default function MovieSchedule () {
  const movieData = [
    {
      location: 'KELAPA GADING XXI',
      date: '24-01-2025',
      times: ['13:20', '15:45', '18:10', '20:35'],
      price: 'Rp 60,000',
    },
    {
      location: 'PLAZA SENAYAN XXI',
      date: '24-01-2025',
      times: ['13:15', '15:40', '18:05', '20:30'],
      price: 'Rp 60,000',
    },
  ];

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Poster Section */}
          <div className="w-full md:w-1/3 p-4">
            <img
              src="https://via.placeholder.com/300x450" // Ganti dengan URL gambar film
              alt="Sky Force Poster"
              className="w-full rounded-md shadow-md"
            />
          </div>

          {/* Movie Info Section */}
          <div className="w-full md:w-2/3 p-4">
            <h1 className="text-2xl font-bold text-gray-800">SKY FORCE</h1>
            <p className="text-sm text-gray-600 mb-2">124 Minutes</p>
            <div className="flex gap-2 mb-4">
              <span className="bg-gray-200 px-2 py-1 rounded text-sm">2D</span>
              <span className="bg-gray-200 px-2 py-1 rounded text-sm">R13+</span>
            </div>

            {/* Schedule Section */}
            {movieData.map((schedule, index) => (
              <div key={index} className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700">{schedule.location}</h2>
                <p className="text-sm text-gray-500 mb-2">{schedule.date}</p>
                <div className="flex gap-2 flex-wrap">
                  {schedule.times.map((time, timeIndex) => (
                    <button
                      key={timeIndex}
                      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition text-gray-800"
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">{schedule.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
