// import { Menu, Library, BookOpen, Home, Settings } from "lucide-react"
import Link from "next/link"
import SidebarUser from "@/components/sidebar-user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Categories from "@/components/layout/categories-book";
import PopularBooks from "@/components/layout/popular-book";

export default async function HomePage() {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    console.log("Session User:", user);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100">
            <SidebarUser />
            {/* Main Content */}
            <main className="flex-1 p-8">

                {/* Search + Profile Bar */}
                <div className="w-full flex items-center justify-between pr-8">
                    {/* Search Bar */}
                    <div className="max-w-sm w-full">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                        />
                    </div>

                    {/* Profile */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                            Hi, {user?.name ?? "Admin"}
                        </span>

                        <Link href="/profile">
                            <img
                                src="https://i.pravatar.cc/40"
                                alt="avatar"
                                className="rounded-full w-12 h-12 border cursor-pointer hover:opacity-80 transition"
                            />
                        </Link>
                    </div>
                </div>

                {/* Categories */}
                <Categories />

                {/* Buku Populer */}
                <PopularBooks />
            </main>
        </div>
    )
}


