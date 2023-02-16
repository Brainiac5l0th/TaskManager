import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-teal-500 relative h-20 mb-12">
      <div className="w-12/12 sm:w-11/12 lg:w-10/12 bg-white m-auto bg-opacity-20 absolute p-4 md:p-6 top-2/4 left-0 right-0 rounded-3xl backdrop-blur-md flex justify-between">
        <img src="./images/logo.svg" alt="logo" className="max-h-8 sm:max-h-11 cursor-pointer transform transition duration-300 hover:scale-105 active:translate-y-1" onClick='#'/>
        <div className="flex">
            <ul className="hidden md:flex items-center justify-between lg:space-x-2 mr-4">
              <li>
                <Link
                  className="w-full font-semibold text-lg  tracking-wide px-2 lg:px-3 py-2 hover:border-b-4 hover:border-teal-600 hover:text-stale-200 transition hover:ease-in-out"
                  to="#"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="w-full font-semibold text-lg tracking-wide px-3 py-2 hover:border-b-4 hover:border-teal-600 hover:text-stale-200 transition  hover:ease-in-out"
                  to="#"
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  className="w-full font-semibold text-lg  tracking-wide px-3 py-2 hover:border-b-4 hover:border-teal-600 hover:text-stale-200 transition  hover:ease-in-out"
                  to="#"
                >
                  Add User
                </Link>
              </li>
              <li>
                <Link
                  className="w-full font-semibold text-lg  tracking-wide px-3 py-2 hover:border-b-4 hover:border-teal-600 hover:text-stale-200 transition  hover:ease-in-out"
                  to="#"
                >
                  Tasks
                </Link>
              </li>
              <li>
                <Link
                  className="w-full font-semibold text-lg  tracking-wide px-3 py-2 hover:border-b-4 hover:border-teal-600 hover:text-stale-200 transition  hover:ease-in-out"
                  to="#"
                >
                  Add Task
                </Link>
              </li>
            </ul>
            <button className="bg-teal-600 text-white font-medium md:font-semibold px-4 md:px-5 py-1 rounded-lg transform transition duration-300 md:hover:scale-110 active:translate-y-1 ">
              Logout
            </button>
            <img className="md:hidden" src="" alt="" />
          </div>
          
        </div>
    </header>
  );
};

export default Header;
