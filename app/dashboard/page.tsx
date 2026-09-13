"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

function DashboardPage() {
  const { data: session } = useSession();
  const [toggle, setToggle] = useState(false);

  console.log(session);

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={() => setToggle((prev) => !prev)}
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
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`
          fixed top-0 left-0 z-40 w-64 h-screen
          transition-transform duration-300
          sm:translate-x-0
          ${toggle ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between ps-2.5 mb-5">
            <a href="#" className="flex items-center">
              <img
                src="https://flowbite.com/images/logo.svg"
                className="h-6 me-3 sm:h-7"
                alt="Flowbite Logo"
              />

              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Flowbite
              </span>
            </a>

            {/* Close button - mobile */}
            <button
              type="button"
              className="sm:hidden text-gray-500 hover:text-gray-900"
              onClick={() => setToggle(false)}
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ms-3">Dashboard</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                <span className="px-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-full">
                  Pro
                </span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>

                <span className="inline-flex items-center justify-center w-6 h-6 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                  3
                </span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </a>
            </li>

            <li>
              <button
                type="button"
                className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 text-left whitespace-nowrap">
                  Sign In
                </span>
              </button>
            </li>

            <li>
              <button
                type="button"
                className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 text-left whitespace-nowrap">
                  Sign Up
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          {/* your existing dashboard content */}
        </div>
      </div>

      {/* Overlay - mobile */}
      {toggle && (
        <div
          className="fixed inset-0 z-30 bg-black/50 sm:hidden"
          onClick={() => setToggle(false)}
        />
      )}
    </>
  );
}

export default DashboardPage;
