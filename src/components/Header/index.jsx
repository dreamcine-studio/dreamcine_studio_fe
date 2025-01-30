import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";

export default function Header() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    return navigate("/");
  };

  return (
    <header className="bg-teal-300 text-white p-4">
      <nav className="bg-gray-300 w-full bg-white border-gray-200 px-5 py-2.5 dark:bg-gray-800">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src="../public/DreamCine.jpeg"
              className="rounded-full mr-3 h-6 sm:h-9"
              alt="Dream Cine Studios"
            />
            <span title="DreamCine - Studios" className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-xl font-semibold whitespace-nowrap dark:text-white">
              DreamCine - Studios
            </span>
            
          </Link>
          <div className="flex items-center lg:order-2">
          {!userInfo && (
              <>
            <Link
              to="/login"
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="ml-4 text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
            >
              Register
            </Link>
            </>
          )}
          {userInfo && (
             <>
                <button
                  onClick={handleLogout}
                  to="/"
                  className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2   flex items-center bg-rose-50 border-2 border-rose-200 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-rose-200 dark:hover:bg-gray-700 group"
                >
                  Logout
                </button>
                <div className="flex items-center">
                  <div className="flex items-center ms-3">
                    <div className="px-4">
                      <p
                        className="text-right text-sm text-gray-900 dark:text-white"
                        role="none"
                      >
                        {userInfo ? userInfo.name : ""}
                      </p>
                      <p
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        {userInfo ? userInfo.email : ""}
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        aria-expanded="false"
                        data-dropdown-toggle="dropdown-user"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                          alt="user photo"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* {userInfo && (
                <button
                    onClick={handleLogout}
                    className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                >
                    Logout
                </button>
                )} */}


            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-700 lg:p-0 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 lg:dark:hover:bg-transparent"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-700 lg:p-0 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 lg:dark:hover:bg-transparent"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link

                  to="/schedule"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-700 lg:p-0 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 lg:dark:hover:bg-transparent"
                >
                  schedule
                </Link>
              </li>
              <li>
                <Link


                  to="/teams"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
