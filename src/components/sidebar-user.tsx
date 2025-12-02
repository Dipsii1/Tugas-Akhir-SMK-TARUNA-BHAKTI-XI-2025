"use client";
import { signOut } from "next-auth/react"
import Link from "next/link"
import { Menu, Library, BookOpen, Home, Settings, Bookmark, History } from "lucide-react"


export default function SidebarUser() {
    return (
      <aside className="w-64 bg-white border-r shadow-lg p-6 hidden md:block rounded-r-xl h-screen sticky top-0">
        <div className="flex items-center gap-2 mb-10">
          <Library className="text-blue-600 h-6 w-6 mt-5" />
          <h1 className="text-xl font-bold mt-5">LibroSpace</h1>
        </div>

        <nav className="flex flex-col gap-4 text-gray-700">
          <Link href="/homepage" className="flex items-center gap-3 hover:text-blue-600 mb-5">
            <Home className="h-5 w-5" /> Beranda
          </Link>

          <Link href="/buku" className="flex items-center gap-3 hover:text-blue-600 mb-5">
            <BookOpen className="h-5 w-5" /> Buku
          </Link>

          <Link href="/users/favorites" className="flex items-center gap-3 hover:text-blue-600 mb-5">
            <Bookmark className="h-5 w-5" /> Favorites
          </Link>

          <Link href="/history" className="flex items-center gap-3 hover:text-blue-600 mb-5">
            <History className="h-5 w-5" /> History
          </Link>

          <Link href="/pengaturan" className="flex items-center gap-3 hover:text-blue-600">
            <Settings className="h-5 w-5" /> Pengaturan
          </Link>
        </nav>
      </aside>
  );
}