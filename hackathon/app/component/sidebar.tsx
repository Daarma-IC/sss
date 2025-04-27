"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-20 bg-white shadow-md flex flex-col items-center py-8 space-y-10">
      {/* Logo */}
      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center text-white">
        <span className="text-xl">🧠</span>
      </div>

      {/* Menu */}
      <div className="flex flex-col space-y-8 items-center">
        <Link href="/">
          <button className="w-12 h-12 hover:bg-yellow-100 text-gray-500 rounded-xl flex items-center justify-center transition-all duration-200">
            <span className="text-xl">🏠</span>
          </button>
        </Link>
        <Link href="/learn">
          <button className="w-12 h-12 hover:bg-yellow-100 text-gray-500 rounded-xl flex items-center justify-center transition-all duration-200">
            <span className="text-xl">📚</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
