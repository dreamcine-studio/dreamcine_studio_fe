import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGenres } from "../../../services/genre";
import { createMovie } from "../../../services/movies";

export default function MovieCreate() {
  const [errors, setErrors] = useState({});

  const [genres, setGenres] = useState([]);
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    poster: "",
    price: "",
    cast: "",
    genre_id: "",
    duration: "",
    release_date: "",
  });

  const navigate = useNavigate();

  // handle relation data
  const fetchGenres = async () => {
    const data = await getGenres();
    setGenres(data);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  console.log("tes",movieData )

  //Handle input chage
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  //Handle file change
  const handleFileChange = (e) => {
    setMovieData({ ...movieData, poster: e.target.files[0] });
  };

  // Handle form submit
  const storeMovie = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("title", movieData.title);
    formDataToSend.append("description", movieData.description);
    formDataToSend.append("poster", movieData.poster);
    formDataToSend.append("price", movieData.price);
    formDataToSend.append("cast", movieData.cast);
    formDataToSend.append("genre_id", movieData.genre_id);
    formDataToSend.append("duration", movieData.duration);
    formDataToSend.append("release_date", movieData.release_date);

    try {
      await createMovie(formDataToSend);
      navigate("/admin/movies");
    } catch (err) {
      console.log(err.response.data.message);
      setErrors(err.response.data.message);
    }
  };



  return (
  
<div className="mt-6">
  <div className="w-full h-8 bg-black mb-4"></div> 
  <div className="rounded-lg bg-white shadow-lg dark:bg-boxdark">
    <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
      <h3 className="text-xl font-semibold text-black dark:text-white">Add Movie Data</h3>
    </div>

    <form onSubmit={storeMovie} className="py-5">
      <div className="p-6 space-y-6 md:space-y-8"> {/* Spacing between inputs */}
        
        {/* Title and Description Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title Input */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Title</label>
            {errors.title && (
              <div className="p-2 my-2 text-red-800 rounded-lg bg-red-50">
                <span className="font-medium">{errors.title[0]}</span>
              </div>
            )}
            <input
            placeholder="Masukkan Title"
              type="text"
              name="title"
              value={movieData.title}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 font-medium text-black outline-none focus:ring-2 focus:ring-indigo-600 transition"
            />
          </div>

          {/* Description Input */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Description</label>
            {errors.description && (
              <div className="p-2 my-2 text-red-800 rounded-lg bg-red-50">
                <span className="font-medium">{errors.description[0]}</span>
              </div>
            )}
            <textarea
              placeholder="Masukkan description"
              rows="6"
              name="description"
              value={movieData.description}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 font-medium text-black outline-none focus:ring-2 focus:ring-indigo-600 transition"
            ></textarea>
          </div>
        </div>

        {/* Poster, Price, and Cast Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Poster Input */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Poster</label>
            {errors.poster && (
              <div className="p-2 my-2 text-red-800 rounded-lg bg-red-50">
                <span className="font-medium">{errors.poster[0]}</span>
              </div>
            )}
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent font-medium outline-none transition file:border-0 file:bg-white file:px-4 file:py-2 file:hover:bg-indigo-600 file:hover:bg-opacity-10 dark:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:ring-2 dark:focus:ring-indigo-600"
            />
          </div>

          {/* Price Input */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Price</label>
            {errors.price && (
              <div className="p-2 my-2 text-red-800 rounded-lg bg-red-50">
                <span className="font-medium">{errors.price[0]}</span>
              </div>
            )}
            <input
              placeholder="Masukkan Price"
              type="number"
              name="price"
              value={movieData.price}
              onChange={handleInputChange}
              min={1}
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 font-medium text-black outline-none focus:ring-2 focus:ring-indigo-600 transition"
            />
          </div>

          {/* Cast Input */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Cast</label>
            {errors.cast && (
              <div className="p-2 my-2 text-red-800 rounded-lg bg-red-50">
                <span className="font-medium">{errors.cast[0]}</span>
              </div>
            )}
            <input
              placeholder="Masukkan Cast"
              type="text"
              name="cast"
              value={movieData.cast}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 font-medium text-black outline-none focus:ring-2 focus:ring-indigo-600 transition"
            />
          </div>
        </div>

        {/* Genre, Duration, and Release Date Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Genre Select */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Genre</label>
            {errors.genre_id && (
              <div className="p-2 my-2 text-red-800 rounded-lg bg-red-50">
                <span className="font-medium">{errors.genre_id[0]}</span>
              </div>
            )}
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                name="genre_id"
                value={movieData.genre_id}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 font-medium text-black outline-none focus:ring-2 focus:ring-indigo-600 transition"
              >
                <option value="">--select genre--</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Duration Input */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Duration</label>
            {errors.duration && (
              <div className="p-2 my-2 text-red-800 rounded-lg bg-red-50">
                <span className="font-medium">{errors.duration[0]}</span>
              </div>
            )}
            <input
              placeholder="Masukkan Duration, contoh : 120, 100"
              type="number"
              name="duration"
              value={movieData.duration}
              onChange={handleInputChange}
              min={1}
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 font-medium text-black outline-none focus:ring-2 focus:ring-indigo-600 transition"
            />
          </div>

          {/* Release Date Input */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Release Date</label>
            {errors.release_date && (
              <div className="p-2 my-2 text-red-800 rounded-lg bg-red-50">
                <span className="font-medium">{errors.release_date[0]}</span>
              </div>
            )}
            <input
              type="date"
              name="release_date"
              value={movieData.release_date}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 font-medium text-black outline-none focus:ring-2 focus:ring-indigo-600 transition"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-3 text-white font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600 transition"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</div>

  );
}
