export default function ScheduleEdit() {
    return (
      <>
        <section className="bg-white :bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 :text-white">
              Edit Schedule
            </h2>
            <form action="#">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-indigo-500 :focus:border-indigo-500"
                    placeholder="Type product name"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    for="brand"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Studio
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-indigo-500 :focus:border-indigo-500"
                    placeholder="Product brand"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    for="price"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Showtime
                  </label>
                  <input
                    type="time"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-indigo-500 :focus:border-indigo-500"
                    placeholder="$2999"
                    required=""
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg focus:ring-4 focus:ring-indigo-200 :focus:ring-indigo-900 hover:bg-indigo-800"
              >
                Edit Schedule
              </button>
            </form>
          </div>
        </section>
      </>
    );
  }
  