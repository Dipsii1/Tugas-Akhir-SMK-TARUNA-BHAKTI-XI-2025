import Sidebar from "@/components/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashBoard() {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    console.log("Session User:", user);

    // if (user.role !== 'admin') {
    //     redirect('/unauthorized')
    // }

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="ml-64 flex-1 p-6">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center rounded-xl">
                    <h2 className="text-lg font-semibold">Dashboard Overview</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                            Hi, {user?.name ?? "Admin"}
                        </span>
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="avatar"
                            className="rounded-full w-8 h-8 border"
                        />
                    </div>
                </header>

                {/* Statistik Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-gray-500">Users</h3>
                        <p className="text-3xl font-bold mt-2">1,245</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-gray-500">Revenue</h3>
                        <p className="text-3xl font-bold mt-2">$12,430</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-gray-500">Orders</h3>
                        <p className="text-3xl font-bold mt-2">320</p>
                    </div>
                </div>
            </main>
        </div>
    );
}