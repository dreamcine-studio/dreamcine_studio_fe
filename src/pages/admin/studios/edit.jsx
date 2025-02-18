import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudios, updateStudio } from "../../../services/studios";

export default function StudioEdit() {
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [maxseats, setMaxSeat] = useState("");

  // destruct id dari URL
  const { id } = useParams();

  const navigate = useNavigate();

  const fetchStudiosDetails = async () => {
    const data = await getStudios();

    const studio = data.find((s) => s.id === parseInt(id));
    if (studio) {
      setName(studio.name);
      setMaxSeat(studio.maxseats);
    }
  };

  useEffect(() => {
    fetchStudiosDetails();
  }, []);

  const updateStudioDetails = async (e) => {
    e.preventDefault();

    const studioData = new FormData();

    studioData.append("name", name);
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
    <div className="flex flex-col gap-9 min-h-screen">
      <div className="rounded-sm shadow-default dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-bold text-black dark:text-white uppercase">
            Edit Studio Data
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
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-blue-600 active:border-blue-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-blue-600 dark:text-white"
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

              <input
                type="number"
                name="maxseats"
                min={1}
                value={maxseats}
                onChange={(e) => setMaxSeat(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-blue-600 active:border-blue-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-blue-600 dark:text-white"
              ></input>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-blue-600 p-3 font-medium text-white hover:bg-opacity-90"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
