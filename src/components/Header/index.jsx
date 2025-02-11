import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { logout } from "../../services/auth";

export default function Header() {
  const [theme, setTheme] = useState("light"); // Default "light"
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");
    const handleChange = (e) => setTheme(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="mb-20">
      <nav className="w-full fixed top-0 left-0 z-50 bg-white border-gray-200 px-5 py-3 dark:bg-gray-900">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <img
              src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
              className="rounded-full mr-3 h-20"
              alt="Dream Cine Studios"
            />
          </Link>

          <ul className="hidden lg:flex space-x-8">
            <li><Link to="/" className="text-gray-900 hover:text-indigo-700 dark:text-white">Home</Link></li>
            <li><Link to="/movies" className="text-gray-900 hover:text-indigo-700 dark:text-white">Movies</Link></li>
            {userInfo && (
            <li><Link to="/booking" className="text-gray-900 hover:text-indigo-700 dark:text-white">Booking</Link></li>
            )}
            <li><Link to="/teams" className="text-gray-900 hover:text-indigo-700 dark:text-white">Team</Link></li>
            <li><Link to="/contacts" className="text-gray-900 hover:text-indigo-700 dark:text-white">Contact</Link></li>
          </ul>

          <div className="hidden lg:flex items-center space-x-4">
            {userInfo ? (
              <div className="flex items-center space-x-4">
                <p className="text-md text-gray-900 dark:text-white">{userInfo.name}</p>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-gray-800 dark:text-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">Log in</Link>
                <Link to="/register" className="text-white bg-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-800">Register</Link>
              </div>
            )}
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleMobileMenu}></div>}

        <div ref={mobileMenuRef} className={`fixed top-0 right-0 w-2/4 h-screen bg-white dark:bg-gray-800 p-5 transform transition-transform duration-300 ease-in-out z-50 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}>
          <button type="button" className="text-gray-500 dark:text-white self-end mb-5" onClick={toggleMobileMenu}>✕</button>
          <ul className="flex flex-col gap-4">
            <li><Link to="/" className="text-gray-900 hover:text-indigo-700 dark:text-white">Home</Link></li>
            <li><Link to="/movies" className="text-gray-900 hover:text-indigo-700 dark:text-white">Movies</Link></li>
            {userInfo && (
            <li><Link to="/booking" className="text-gray-900 hover:text-indigo-700 dark:text-white">Booking</Link></li>
            )}
            <li><Link to="/teams" className="text-gray-900 hover:text-indigo-700 dark:text-white">Team</Link></li>
            <li><Link to="/contacts" className="text-gray-900 hover:text-indigo-700 dark:text-white">Contact</Link></li>
          </ul>

          {/* User Info di Mobile Menu */}
          {userInfo ? (
            <div className="flex absolute left-0 bottom-0 flex-col items-center p-6">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{userInfo.name}</p>
              <button onClick={handleLogout} className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex absolute left-0 bottom-0 flex-col items-center p-6">
              <Link to="/login" className="w-full text-center text-gray-800 dark:text-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">Log in</Link>
              <Link to="/register" className="w-full text-center mt-2 text-white bg-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-800">Register</Link>
            </div>
          )}
        </div>

        
      </nav>
    </header>
  );
}
