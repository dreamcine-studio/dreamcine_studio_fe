import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/auth"; 

export default function Login() {
  const [theme, setTheme] = useState("light"); // Default "light"
  const [showPassword, setShowPassword] = useState(false);

  const [inputData, setInput] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State untuk menampilkan error
  const navigate = useNavigate();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");
    const handleChange = (e) => setTheme(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kirim data login ke backend untuk verifikasi
      const res = await login(inputData);

      // Jika login berhasil, simpan token dan user info
      sessionStorage.setItem("accessToken", res.token);
      sessionStorage.setItem("userInfo", JSON.stringify(res.user));

      const redirectTo = sessionStorage.getItem("redirectAfterLogin");
if (redirectTo) {
  sessionStorage.removeItem("redirectAfterLogin");
  return navigate(redirectTo); 
}

      // Redirect berdasarkan role user
      if (res.user.role === "admin") {
        return navigate("/admin");
      } else {
        return navigate("/");
      }
    } catch (err) {
      console.error("Login gagal:", err);
      // Tangani error jika login gagal
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message); // Tampilkan pesan error dari server
      } else {
        setErrorMessage("Terjadi kesalahan, silakan coba lagi.");
      }
    }
  };

  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      return navigate("/"); // Redirect jika sudah login dan ada token
    }
  }, [accessToken, navigate]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <Link
          to="/"
          className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-violet-500 flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-24 h-24 size-14"
            src={theme === "dark" ? "/logo-square-dark.png" : "/logo-square-light.png"}
            alt="logo"
          />
          {/* Dream-Cine Studio */}
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  value={inputData.email}
                  onChange={handleInput}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  value={inputData.password}
                  onChange={handleInput}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="[&::-ms-reveal]:hidden bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              {/* Checkbox to toggle password visibility */}
              <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)} // Toggle visibility
                    className="mr-2"
                  />
                  <label htmlFor="showPassword" className="text-sm text-gray-900 dark:text-white">
                    Show Password
                  </label>
                </div>
              {errorMessage && (
                <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
              )}
              
              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Sign in
              </button>
              
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}