import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudios, updateStudio } from "../../../services/seats";

export default function StudioEdit() {
  const [errors, setErrors] = useState({});

  // ini dari masing masing,
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [maxseats, setMaxSeat] = useState("");

  // destruct id dari URL
  const { id } = useParams();

  const navigate = useNavigate();

  const fetchStudiosDetails = async () => {
    const data = await getStudios();

    const studio = data.find((book) => book.id === parseInt(id));
    if (studio) {
      setName(studio.name);
      setLocation(studio.location);
      setMaxSeat(studio.maxseats);
    }
  };

  // untuk menjalakan fetch nya, kayka function biasa
  // fetchBookDetails()

  // lebih baik kita pakai useEffect

  useEffect(() => {
    fetchStudiosDetails();
  }, []);

  //update book data
  // ini pakai async karena di service nya pakai async pada update
  // ini untuk ke form
  const updateStudioDetails = async (e) => {
    e.preventDefault();

    const studioData = new FormData();

    studioData.append("name", name);
    studioData.append("location", location);
    studioData.append("maxseats", maxseats);

    studioData.append("_method", "PUT");

    await updateStudio(id, studioData)
      .then(() => {
        navigate("/admin/studios");
      })
      .catch((err) => {
        setErrors(err.response.data.message);
      });
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Edit Studios
          </h3>
        </div>
        <form onSubmit={updateStudioDetails} className="py-5">
          <div className="p-6.5 flex flex-col gap-5">
            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                Name
              </label>
              {errors.name && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.name[0]}</span>
                </div>
              )}

              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                Location
              </label>
              {errors.location && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.location[0]}</span>
                </div>
              )}

              <input
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-base font-medium text-black dark:text-white">
                Max Seat
              </label>
              {errors.maxseats && (
                <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
                  <span className="font-medium">{errors.maxseats[0]}</span>
                </div>
              )}

              <textarea
                rows="6"
                name="maxseats"
                value={maxseats}
                onChange={(e) => setMaxSeat(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-indigo-600 p-3 font-medium text-white hover:bg-opacity-90"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
