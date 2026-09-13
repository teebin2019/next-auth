"use client";
import { useSession } from "next-auth/react";
function DashboardPage() {
  const { data: session, status, update } = useSession();
  console.log(session);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        Welcome {session?.user?.email}
      </div>
    </div>
  );
}

export default DashboardPage;
