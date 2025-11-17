import SidebarUser from "@/components/sidebar-user";
import BooksPage from "@/components/layout/books-page";

export default function BukuPage() {
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
