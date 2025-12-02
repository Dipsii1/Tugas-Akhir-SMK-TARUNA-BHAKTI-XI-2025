"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import {
  Library,
  BookOpen,
  Home,
  Settings,
  ClipboardList,
  BookOpenText,
  BookmarkPlus,
  ChevronDown,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [openBuku, setOpenBuku] = useState(false);
  const pathname = usePathname();

  const submenuClose = () => setOpenBuku(false);

  const isActive = (route: string) =>
    pathname.startsWith(route)
      ? "text-blue-600 font-semibold"
      : "text-gray-700";

  const isDropdownActive = [
    "/admin/borrowed-list",
    "/admin/request-list",
    "/admin/books-list",
    "/admin/add-books",
  ].includes(pathname);

  return (
    <aside className="w-80 bg-white border-r shadow-lg p-6 hidden md:block rounded-r-xl h-screen sticky top-0">
      <div className="flex items-center gap-2 mb-10">
        <Library className="text-blue-600 h-6 w-6 mt-5" />
        <h1 className="text-xl font-bold mt-5">LibroSpace</h1>
      </div>

      <nav className="flex flex-col gap-4">

        {/* DASHBOARD */}
        <Link
          href="/admin/dashboard"
          className={`flex items-center gap-3 hover:bg-blue-100 hover:scale-[1.02] px-2 py-2 rounded-lg transition-all ${isActive("/admin/dashboard")}`}
        >
          <Home className="h-5 w-5" /> Dashboard
        </Link>

        {/* ================= Improved Dropdown Buku ================= */}
        <Collapsible open={openBuku || isDropdownActive} onOpenChange={setOpenBuku}>
          <CollapsibleTrigger
            className={`
              flex items-center justify-between w-full px-2 py-2 rounded-lg transition-all
              hover:bg-blue-100 hover:scale-[1.02]
              ${isDropdownActive ? "text-blue-600 font-semibold" : "text-gray-700"}
            `}
          >
            <span className="flex items-center gap-3 text-[15px]">
              <BookOpen className={`h-5 w-5 ${isDropdownActive ? "text-blue-600" : ""}`} />
              Buku
            </span>
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ${openBuku || isDropdownActive ? "rotate-180 text-blue-600" : "text-gray-600"
                }`}
            />
          </CollapsibleTrigger>

          {/* Separator visual */}
          {(openBuku || isDropdownActive) && (
            <div className="ml-2 mr-4">
              <div className="h-px bg-gray-200 my-2"></div>
            </div>
          )}

          <CollapsibleContent className="animate-in slide-in-from-top-1 fade-in-10 duration-300">
            <div className="ml-6 mt-2 flex flex-col gap-2">
              <Link
                href="/admin/borrowed-list"
                onClick={submenuClose}
                className={`
                  flex items-center gap-3 px-2 py-2 rounded-md text-[14px] transition-all
                  hover:bg-blue-100 hover:scale-[1.02]
                  ${isActive("/admin/borrowed-list")}
                `}
              >
                <ClipboardList className="h-4 w-4" /> Daftar Peminjaman Buku
              </Link>

              <Link
                href="/admin/borrowed-list"
                onClick={submenuClose}
                className={`
                  flex items-center gap-3 px-2 py-2 rounded-md text-[14px] transition-all
                  hover:bg-blue-100 hover:scale-[1.02]
                  ${isActive("/admin/request-list")}
                `}
              >
                <ClipboardList className="h-4 w-4" /> Daftar Permintaan Peminjaman buku
              </Link>

              <Link
                href="/admin/books-list"
                onClick={submenuClose}
                className={`
                  flex items-center gap-3 px-2 py-2 rounded-md text-[14px] transition-all
                  hover:bg-blue-100 hover:scale-[1.02]
                  ${isActive("/admin/books-list")}
                `}
              >
                <BookOpenText className="h-4 w-4" /> Daftar Buku
              </Link>

              <Link
                href="/admin/add-books"
                onClick={submenuClose}
                className={`
                  flex items-center gap-3 px-2 py-2 rounded-md text-[14px] transition-all
                  hover:bg-blue-100 hover:scale-[1.02]
                  ${isActive("/admin/add-books")}
                `}
              >
                <BookmarkPlus className="h-4 w-4" /> Tambah Buku
              </Link>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* PENGATURAN */}
        <Link
          href="/pengaturan"
          className={`flex items-center gap-3 hover:bg-blue-100 hover:scale-[1.02] px-2 py-2 rounded-lg transition-all ${isActive("/pengaturan")}`}
        >
          <Settings className="h-5 w-5" /> Pengaturan
        </Link>
      </nav>
    </aside>
  );
}
