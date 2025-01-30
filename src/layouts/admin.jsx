import { Link, Outlet, useNavigate,  } from "react-router-dom";
import { logout } from "../services/auth";
import { useEffect } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    logout()
    return navigate('/login')
  }

  console.log(userInfo);
  useEffect(() => {
    // cek apakah ada access token
    if (!accessToken) {
      return navigate("/login");
    }

    // cek apakah userInfo.role bukan admin atau staff?
    if (userInfo.role !== "admin") {
      return navigate("/");
    }
  }, [accessToken, userInfo, navigate]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              
              <Link to="/" className="flex ms-2 md:me-24">
                {/* <img
                  src="./public/DreamCine.jpeg"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                /> */}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-xl  self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  DreamCine-Studio
                </span>
                {/* <span>  Admin</span> */}
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div className="px-4">
                  <p
                    className="text-right text-sm text-gray-900 dark:text-white"
                    role="none"
                  >{userInfo ? userInfo.name : ""}
                  </p>
                  <p
                    className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                    role="none"
                  >{userInfo ? userInfo.email : ""}
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
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <ul className="py-1" role="none">
                    <li>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="flex flex-col gap-5 h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/admin"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-chart-pie fa-lg"></i>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/genres"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-masks-theater fa-lg"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Genres</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/studios"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-person-booth fa-lg"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Studios</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/payment_methods"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              ><i className="fa-solid fa-credit-card fa-lg"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Payment Methods
                </span>
              </Link>
            </li>
          </ul>

          <div className="border-t border-gray-200 dark:border-gray-700"></div>

          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/admin/movies"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-film fa-lg"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Movies</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/seats"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-chair fa-lg"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Seats</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/schedules"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-calendar-days fa-xl"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Schedules</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/bookings"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-cart-shopping fa-lg"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Bookings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/payments"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-money-bill fa-lg"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Payments</span>
              </Link>
            </li>

            <li>
              <Link
                to="admin/users"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-circle-user fa-lg"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            
            <li>
              <button
                onClick={handleLogout}
                to="admin/users"
                className="flex items-center bg-rose-50 border-2 border-rose-200 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-rose-200 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-right-from-bracket fa-lg"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Outlet />
        </div>
      </div>
    </>
  );
}
