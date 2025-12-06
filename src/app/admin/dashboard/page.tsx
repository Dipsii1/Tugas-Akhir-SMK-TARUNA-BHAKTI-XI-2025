import Sidebar from "@/components/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { BookOpen, TrendingUp, Users, Calendar } from "lucide-react";

interface Book {
  id: number;
  judul: string;
  penulis: string | null;
  cover: string | null;
}

interface Borrow {
  id: number;
  bookId: number;
  userId: number;
  tanggalPinjam: string;
  tanggalKembali: string | null;
}

export default async function DashBoard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || user.role !== "admin") {
    redirect("/homepage");
  }

  let books: Book[] = [];
  let borrows: Borrow[] = [];

  try {
    const booksRes = await fetch("http://localhost:8080/books", {
      method: "GET",
      cache: "no-store",
    });
    if (booksRes.ok) {
      const booksJson = await booksRes.json();
      books = booksJson.data || [];
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  }

  try {
    const borrowsRes = await fetch("http://localhost:8080/borrowed", {
      method: "GET",
      cache: "no-store",
    });
    if (borrowsRes.ok) {
      const borrowsJson = await borrowsRes.json();
      borrows = borrowsJson.data || [];
    }
  } catch (error) {
    console.error("Error fetching borrows:", error);
  }

  // Calculate additional stats
  const activeBorrows = borrows.filter(b => b.tanggalKembali === null).length;
  const completedBorrows = borrows.filter(b => b.tanggalKembali !== null).length;
  
  // Calculate percentages safely
  const borrowRate = books.length > 0 ? ((activeBorrows / books.length) * 100).toFixed(1) : "0.0";
  const avgBorrowsPerBook = books.length > 0 ? (borrows.length / books.length).toFixed(1) : "0.0";
  const returnRate = borrows.length > 0 ? ((completedBorrows / borrows.length) * 100).toFixed(1) : "0.0";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Dashboard Overview
                </h1>
                <p className="text-gray-600 text-lg">
                  Selamat datang kembali, <span className="font-semibold text-indigo-600">{user?.name ?? "Admin"}</span>
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {new Date().toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Books Card */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Total
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                Jumlah Buku
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {books.length}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Buku tersedia di perpustakaan
              </p>
            </div>

            {/* Total Borrowings Card */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 rounded-lg p-3">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                  Total
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                Total Peminjaman
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {borrows.length}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Semua riwayat peminjaman
              </p>
            </div>

            {/* Active Borrowings Card */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-amber-100 rounded-lg p-3">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                  Aktif
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                Sedang Dipinjam
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {activeBorrows}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Buku yang sedang dipinjam
              </p>
            </div>

            {/* Completed Borrowings Card */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-emerald-100 rounded-lg p-3">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  Selesai
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                Sudah Dikembalikan
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {completedBorrows}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Peminjaman yang selesai
              </p>
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="bg-gradient-to-br from-blue-200 via-white to-blue-100 rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Ringkasan Statistik</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className=" rounded-lg p-4 borde bg-white border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Tingkat Peminjaman</p>
                <p className="text-2xl font-bold text-gray-900">
                  {borrowRate}%
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {activeBorrows} dari {books.length} buku sedang dipinjam
                </p>
              </div>
              <div className=" rounded-lg p-4 borde bg-white border border-blue-200 ">
                <p className="text-sm text-gray-600 mb-1">Rata-rata per Buku</p>
                <p className="text-2xl font-bold text-gray-900">
                  {avgBorrowsPerBook}x
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Total {borrows.length} peminjaman
                </p>
              </div>
              <div className=" rounded-lg p-4 bg-white border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Tingkat Pengembalian</p>
                <p className="text-2xl font-bold text-gray-900">
                  {returnRate}%
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {completedBorrows} dari {borrows.length} sudah kembali
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}