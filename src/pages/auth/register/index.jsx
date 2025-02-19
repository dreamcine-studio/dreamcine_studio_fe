// import { useEffect, useState } from "react"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../services/auth";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light"); // Default "light"

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) setError("");
  }; 

  useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(mediaQuery.matches ? "dark" : "light");
      const handleChange = (e) => setTheme(e.matches ? "dark" : "light");
      mediaQuery.addEventListener("change", handleChange);
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }, []);

  // Handle form submit
  const storeRegister = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      setError("You must accept the Terms and Conditions.");
      return;
    }

    const formDataToSend = new FormData();

    formDataToSend.append("email", registerData.name);
    formDataToSend.append("email", registerData.email);
    formDataToSend.append("password", registerData.password);

    try {
      await register(registerData);
      alert("Register Success, Please Login");
      navigate("/login");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

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
              Create an account
            </h1>

            <form
              onSubmit={storeRegister}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  value={registerData.name}
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="name"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  value={registerData.email}
                  onChange={handleInputChange}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
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
                  value={registerData.password}
                  onChange={handleInputChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  required=""
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the
                    <button
                      type="button"
                      onClick={() => setShowTerms(true)}
                      className="text-indigo-500 hover:underline ml-1"
                    >
                      Terms and Conditions
                    </button>
                  </label>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={!isChecked}
                className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] h-[500px] overflow-y-auto">
            <h2 className="text-xl font-bold text-indigo-500">
              Terms and Conditions
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Last Updated: Friday, 7 February 2025
              <span>
                <br />
                <br />
              </span>
              Welcome to Dream-Cine Studio! By accessing and using our platform,
              you agree to comply with the following Terms and Conditions.
              Please read them carefully.
              <span>
                <br />
              </span>
              1. Acceptance of Terms By using our website, services, and
              applications, you acknowledge that you have read, understood, and
              agreed to these Terms and Conditions.
              <span>
                <br />
              </span>
              2. User Accounts You must be at least 18 years old or have
              parental consent to create an account. You are responsible for
              maintaining the security of your account credentials. Dream-Cine
              Studio is not liable for any unauthorized access to your account.
              <span>
                <br />
              </span>
              3. Use of Services Our platform is intended for personal and
              non-commercial use. You agree not to misuse our services,
              including but not limited to hacking, distributing malware, or
              engaging in fraudulent activities.
              <span>
                <br />
              </span>
              4. Content Ownership and Usage All content, including images,
              videos, and text, is the property of Dream-Cine Studio or its
              licensors. Users may not copy, modify, distribute, or reproduce
              any content without prior written permission.
              <span>
                <br />
              </span>
              5. Privacy Policy Your use of our platform is also governed by our
              Privacy Policy, which explains how we collect, use, and protect
              your data.
              <span>
                <br />
              </span>
              6. Payment and Refund Policy Payments for premium features or
              services are non-refundable unless stated otherwise. Dream-Cine
              Studio reserves the right to modify pricing at any time.
              <span>
                <br />
              </span>
              7. Termination of Services We reserve the right to suspend or
              terminate your account if you violate these Terms and Conditions.
              <span>
                <br />
              </span>
              8. Limitation of Liability Dream-Cine Studio is not responsible
              for any losses, damages, or disruptions resulting from the use of
              our platform.
              <span>
                <br />
              </span>
              9. Changes to Terms We may update these Terms and Conditions
              periodically. Continued use of our platform constitutes acceptance
              of the revised terms.
              <span>
                <br />
              </span>
              10. Contact Information For any questions or concerns regarding
              these Terms and Conditions, please contact us at{" "}
              <a className="text-purple-500 font-bold" href="#">
                Dreamcine_studios@gmail.com
              </a>
              .<span></span>
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowTerms(false)}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
