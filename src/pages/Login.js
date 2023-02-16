import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="flex justify-center items-center md:h-5/6 my-16 sm:my-32">
      <div className="bg-white backdrop-blur-sm shadow-md border sm:border-gray-200 rounded-xl sm:w-4/6 sm:max-w-md dark:bg-gray-800 py-10 px-10 md:dark:border-stone-50">
        <form className="space-y-6 " action="#">
          <h3 className="text-2xl text-center font-semibold text-gray-900 dark:text-white">
            Sign in
          </h3>
          <div>
            <label
              for="email"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your email or Phone
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter Email or Phone"
              required
            />
          </div>
          <div>
            <label
              for="password"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required=""
            />
            <Link
              href="#"
              className="text-sm hover:underline ml-auto text-teal-500"
            >
              Lost Password?
            </Link>
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  className="bg-teal-500 border border-gray-300 h-4 w-4"
                  required=""
                />
              </div>
              <div className="text-sm ml-3">
                <label
                  for="remember"
                  className="font-medium text-gray-900 dark:text-gray-300 pr-2"
                >
                  Remember me
                </label>
              </div>
            </div>
            
          </div>
          
          <button
            type="submit"
            className="w-full text-white bg-teal-700 transition-transform transform duration-300 hover:scale-105 active:translate-y-1 hover:bg-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
          >
            Login to your account
          </button>
          
        </form>
      </div>
    </section>
  );
};

export default Login;
