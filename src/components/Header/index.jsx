import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../services/auth";

export default function Header() {
  const [theme, setTheme] = useState("light"); // Default "light"
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  useEffect(() => {
    // Deteksi preferensi tema pengguna
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Set tema berdasarkan preferensi sistem
    setTheme(mediaQuery.matches ? "dark" : "light");

    // Update tema saat preferensi sistem berubah
    const handleChange = (e) => setTheme(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <nav className="w-full fixed top-0 left-0 z-50 bg-white border-gray-200 px-5 py-3 dark:bg-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
          <img
            src={theme === "dark" ? "../public/logo-dark.png" : "../public/logo-light.png"}
            className="rounded-full mr-3 h-20"
            alt="Dream Cine Studios"
          />
          </Link>
          

          {/* Navbar Links - Desktop */}
          <ul className="hidden lg:flex space-x-8">
            <li>
              <Link to="/" className="text-gray-900 hover:text-indigo-700 dark:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/movies" className="text-gray-900 hover:text-indigo-700 dark:text-white">
                Movies
              </Link>
            </li>
            <li>
              <Link to="/booking/pay/:id" className="text-gray-900 hover:text-indigo-700 dark:text-white">
                Payment
              </Link>
            </li>
            <li>
              <Link to="/tickets" className="text-gray-900 hover:text-indigo-700 dark:text-white">
                Tickets
              </Link>
            </li>
            <li>
              <Link to="/booking" className="text-gray-900 hover:text-indigo-700 dark:text-white">
                Booking
              </Link>
            </li>
            <li>
              <Link to="/teams" className="text-gray-900 hover:text-indigo-700 dark:text-white">
                Team
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="text-gray-900 hover:text-indigo-700 dark:text-white">
                Contact
              </Link>
            </li>
          </ul>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {userInfo ? (
              <div className="flex items-center space-x-4">
                <p className="text-md text-gray-900 dark:text-white">{userInfo.name}</p>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-gray-800 dark:text-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-800"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
