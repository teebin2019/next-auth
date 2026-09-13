"use client";

import Sidebar from "../components/sidebar";
function DashboardPage() {
  return (
    <>
      <Sidebar />
      {/* Main content */}
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          {/* your existing dashboard content */}
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
