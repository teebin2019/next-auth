"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

function UserPage() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchData = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data?.users);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch("/api/users/" + id, {
        method: "DELETE",
      });
      const result = await res.json();

      console.log(result);

      alert("ลบข้อมูลสำเร็จ");
      fetchData();
    } catch (err) {
      console.log(err);
      alert("เกิดข้อผิดพลาด");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Sidebar />
      {/* Main content */}
      <div className="p-4 sm:ml-64">
        <div className="p-4  rounded-lg dark:border-gray-700">
          <h2 className="font-bold text-2xl my-2">Users</h2>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {["ลำดับ", "ชื่อ-สกุล", "อีเมล", "ดำเนินการ"].map(
                    (item, idx) => (
                      <th scope="col" className="px-6 py-3" key={idx}>
                        {item}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {users.map((item, idx) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                    key={item.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {idx + 1}
                    </th>
                    <td className="px-6 py-4">
                      {item.first_name + " " + item.last_name}
                    </td>
                    <td className="px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4 text-left ">
                      <a
                        href={"/users/" + item.id + "/edit"}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
                      >
                        Edit
                      </a>
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-2"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;
