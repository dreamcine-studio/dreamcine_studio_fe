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
  const [errors, setErrors] = useState({});
  const [theme, setTheme] = useState("light");

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value });

    // Menghapus error saat input mulai diisi
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) setErrors((prevErrors) => ({ ...prevErrors, terms: "" }));
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

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Handle form submit
  const storeRegister = async (e) => {
    e.preventDefault();
    let newErrors = {};
  
    // Validasi input di frontend
    if (!registerData.name.trim()) newErrors.name = "Name is required.";
    if (!registerData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(registerData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!registerData.password.trim()) newErrors.password = "Password is required.";
    if (!isChecked) newErrors.terms = "You must accept the Terms and Conditions.";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      await register(registerData);
      alert("Register Success, Please Login");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          // Jika email sudah terdaftar, tampilkan pesan spesifik
          setErrors({ email: "Email already exists. Please login instead." });
        } else if (error.response.status === 422) {
          // Set error validasi dari backend ke state errors
          setErrors(error.response.data.errors);
        }
      } else {
        console.log(error);
      }
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
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>

            <form onSubmit={storeRegister} className="space-y-4 md:space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  value={registerData.name}
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  value={registerData.email}
                  onChange={handleInputChange}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="name@company.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  value={registerData.password}
                  onChange={handleInputChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                    I accept the{" "}
                    <button
                      type="button"
                      onClick={() => setShowTerms(true)}
                      className="text-indigo-500 hover:underline"
                    >
                      Terms and Conditions
                    </button>
                  </label>
                </div>
              </div>
              {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Create an account
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-indigo-600 hover:underline dark:text-indigo-500">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
