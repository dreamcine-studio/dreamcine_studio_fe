import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenres } from "../../../services/genre";
import { getMovies, updateMovie } from "../../../services/movies";

export default function MovieEdit() {
  const [genres, setGenres] = useState([]);
  const [errors, setErrors] = useState({});

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [cast, setCast] = useState("");
  const [genreId, setGenreId] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  // Destruck ID dari URL
  const { id } = useParams();

  const navigate = useNavigate();

  // fetch data movie berdasarkan ID
  const fetchMoviesDetails = async () => {
    const data = await getMovies(); // ambil semuah data movie

    // cari data movie berdasarkan ID

    const movie = data.find((movie) => movie.id === parseInt(id));
    if (movie) {
      // Asign data to state
      setTitle(movie.title);
      setDescription(movie.description);
      setPrice(movie.price);
      setCast(movie.cast);
      setGenreId(movie.genre_id);
      setDuration(movie.duration);
      setReleaseDate(movie.release_date);
    }
  };

  const fetchGenres = async () => {
    const data = await getGenres();
    setGenres(data);
  };

  useEffect(() => {
    fetchMoviesDetails();
    fetchGenres();
  }, []);

  // handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // update movie data
  const updateMovieDetail = async (e) => {
    e.preventDefault();

    // buat FormData
    const movieData = new FormData();

    movieData.append("title", title);
    movieData.append("description", description);
    movieData.append("price", price);
    movieData.append("stock", cast);
    movieData.append("genre_id", genreId);
    movieData.append("duration", duration);
    movieData.append("release_date", releaseDate);
    movieData.append("_method", "PUT");

    if (image) {
      movieData.append("poster", image);
    }
    await updateMovie(id, movieData)
      .then(() => {
        navigate("/admin/movies");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.message);
      });
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Add Data</h3>
        </div>
        <form onSubmit={updateMovieDetail} className="py-5">
          <div className="p-6.5 flex flex-col gap-5">
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Title
              </label>
              {errors.title && (
                <div
                  className="p-2 my-2 text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">{errors.title[0]}</span>
                </div>
              )}
              <input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Description
              </label>
              {errors.description && (
                <div
                  className="p-2 my-2 text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">{errors.description[0]}</span>
                </div>
              )}
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="6"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              ></textarea>
            </div>
          </div>
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Poster
            </label>
            {errors.poster && (
              <div
                className="p-2 my-2 text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                <span className="font-medium">{errors.poster[0]}</span>
              </div>
            )}
            <input
              onChange={handleFileChange}
              type="file"
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-normal outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-indigo-600 file:hover:bg-opacity-10 focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-indigo-600"
            />
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Price
              </label>
              {errors.price && (
                <div
                  className="p-2 my-2 text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">{errors.price[0]}</span>
                </div>
              )}
              <input
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                min={1}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Cast
              </label>
              {errors.cast && (
                <div
                  className="p-2 my-2 text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">{errors.cast[0]}</span>
                </div>
              )}
              <input
                name="cast"
                value={cast}
                onChange={(e) => setCast(e.target.value)}
                type="text"
                min={1}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Genre
              </label>
              {errors.genre_id && (
                <div
                  className="p-2 my-2 text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">{errors.genre_id[0]}</span>
                </div>
              )}
              <div
                name="genre_id"
                value={genreId}
                onChange={(e) => setGenreId(e.target.value)}
                className="relative z-20 bg-transparent dark:bg-form-input"
              >
                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-indigo-600 active:border-indigo-600 dark:border-form-strokedark dark:bg-form-input dark:focus:border-indigo-600">
                  <option value="" className="text-body">
                    --select genre--
                  </option>
                  {genres.map((genre) => (
                    <option
                      key={genre.id}
                      value={genre.id}
                      className="text-body"
                    >
                      {genre.name}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                duration
              </label>
              {errors.Duration && (
                <div
                  className="p-2 my-2 text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">{errors.duration[0]}</span>
                </div>
              )}
              <input
                name="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                type="number"
                min={1}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Releast Date
              </label>
              {errors.releast_date && (
                <div
                  className="p-2 my-2 text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  <span className="font-medium">{errors.releast_date[0]}</span>
                </div>
              )}
              <input
                name="release_date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                type="date"
                min={1}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-indigo-600"
              />
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
