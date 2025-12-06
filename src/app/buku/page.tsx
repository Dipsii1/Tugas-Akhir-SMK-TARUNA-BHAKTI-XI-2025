import SidebarUser from "@/components/sidebar-user";
import BooksPage from "@/components/layout/books-page";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function BukuPage() {

  const session = await getServerSession(authOptions);
      const user = session?.user;
  
      console.log("Session User:", user);
  
  
      if (!user) {
          redirect("/login"); // ✅ Hanya string URL
      }
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100">

      {/* Sidebar */}
      <SidebarUser />

      {/* Content */}
      <main className="flex-1">
        <BooksPage />
      </main>

    </div>
  );
}
