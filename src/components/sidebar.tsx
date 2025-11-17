"use client";
import { signOut } from "next-auth/react"

export default function Sidebar() {
    return (
    <div className="w-64 bg-white h-screen shadow-md p-5 flex flex-col justify-between fixed">
      {/* Bagian Atas */}
      <div>
        <h1 className="text-2xl font-bold mb-8 text-blue-600">LibroSpace</h1>
        <nav className="space-y-3">
          <a
            href=""
            className="block p-2 rounded-md hover:bg-blue-50 font-medium text-gray-700"
          >
            🏠 Home
          </a>
          <a
            href=""
            className="block p-2 rounded-md hover:bg-blue-50 font-medium text-gray-700"
          >
            📊 Analytics
          </a>
          <a
            href="#"
            className="block p-2 rounded-md hover:bg-blue-50 font-medium text-gray-700"
          >
            ⚙️ Settings
          </a>
        </nav>
      </div>

      {/* Tombol Logout */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-10 w-full bg-red-400 hover:bg-red-600 text-white py-2 rounded-md font-medium transition cursor-pointer">
         Logout
      </button>
    </div>
  );
}