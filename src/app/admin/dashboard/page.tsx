import Sidebar from "@/components/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { BookOpen, TrendingUp, Users, Calendar, CheckCircle, Clock} from "lucide-react";
import Link from "next/link";

interface Book {
  id: number;
  judul: string;
  penulis: string | null;
  cover: string | null;
}

interface Borrow {
  id: number;
  id_user: number;
  id_buku: number;
  tgl_peminjaman: string;
  tgl_pengembalian: string | null;
  status: "pending" | "accept" | "returned" | "rejected";
  catatan: string | null;
  created_at: string;
  updated_at: string;
  judul_buku: string;
  penulis: string;
  nama_user: string;
  email_user: string;
}

interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
}

async function fetchBooks(): Promise<Book[]> {
  try {
    const res = await fetch("http://localhost:8080/books", {
      method: "GET",
      cache: "no-store",
    });
    if (res.ok) {
      const json: ApiResponse<Book[]> = await res.json();
      return json.data || [];
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  }
  return [];
}

async function fetchBorrows(): Promise<Borrow[]> {
  try {
    const res = await fetch("http://localhost:8080/borrowed", {
      method: "GET",
      cache: "no-store",
    });
    if (res.ok) {
      const json: ApiResponse<Borrow[]> = await res.json();
      return json.data || [];
    }
  } catch (error) {
    console.error("Error fetching borrows:", error);
  }
  return [];
}

export default async function DashBoard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || user.role !== "admin") {
    redirect("/homepage");
  }

  // Fetch data in parallel for better performance
  const [books, borrows] = await Promise.all([
    fetchBooks(),
    fetchBorrows(),
  ]);

  // Calculate statistics based on actual API structure
  const activeBorrows = borrows.filter(b => b.status === "accept" && b.tgl_pengembalian === null).length;
  const completedBorrows = borrows.filter(b => b.status === "returned").length;
  const pendingBorrows = borrows.filter(b => b.status === "pending").length;

  // Sort borrows by created date (newest first)
  const recentBorrows = [...borrows]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accept":
        return "bg-amber-100 text-amber-700";
      case "returned":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-blue-100 text-blue-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "accept":
        return "Accepted";
      case "returned":
        return "Returned";
      case "pending":
        return "Pending";
      case "rejected":
        return "Rejected";
      default:
        return "Tidak Diketahui";
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Dashboard Overview
                </h1>
                <p className="text-gray-600 text-lg">
                  Selamat datang kembali, <span className="font-semibold text-indigo-600">{user?.name ?? "Admin"}</span>
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 w-fit">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

            {/* Active Borrowings Card */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-amber-100 rounded-lg p-3">
                  <Clock className="w-6 h-6 text-amber-600" />
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
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
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

            {/* Pending Requests Card */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 rounded-lg p-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                  Menunggu
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                Permintaan Pending
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {pendingBorrows}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Menunggu persetujuan
              </p>
            </div>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Borrowings */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Aktivitas Peminjaman Terbaru</h2>
                <span className="text-sm text-blue-600 font-medium hover:text-blue-700 cursor-pointer transition">
                  <Link href="/admin/borrowed-list">Lihat Semua</Link>
                </span>
              </div>

              {recentBorrows.length > 0 ? (
                <div className="space-y-3">
                  {recentBorrows.map((borrow) => (
                    <div key={borrow.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="bg-blue-100 rounded-lg p-2 flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {borrow.judul_buku}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          oleh {borrow.penulis}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-500">
                            {borrow.nama_user}
                          </p>
                          <span className="text-gray-300">•</span>
                          <p className="text-xs text-gray-500">
                            {new Date(borrow.tgl_peminjaman).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${getStatusBadge(borrow.status)}`}>
                        {getStatusText(borrow.status)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Belum ada peminjaman</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-sm p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-3 rounded-lg font-medium transition flex items-center gap-3"
                  aria-label="Tambah Buku Baru"
                >
                  <BookOpen className="w-5 h-5 flex-shrink-0" />
                  <span className="text-left flex-1">Tambah Buku Baru</span>
                </button>
                <button
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-3 rounded-lg font-medium transition flex items-center gap-3"
                  aria-label="Kelola Pengguna"
                >
                  <Users className="w-5 h-5 flex-shrink-0" />
                  <span className="text-left flex-1">Kelola Pengguna</span>
                </button>
                <button
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-3 rounded-lg font-medium transition flex items-center gap-3"
                  aria-label="Lihat Laporan"
                >
                  <TrendingUp className="w-5 h-5 flex-shrink-0" />
                  <span className="text-left flex-1">Lihat Laporan</span>
                </button>
              </div>

              {/* Summary Stats */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-white/80 mb-3">Ringkasan Hari Ini</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <p className="text-2xl font-bold">{activeBorrows}</p>
                    <p className="text-xs text-white/80">Sedang Dipinjam</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <p className="text-2xl font-bold">{pendingBorrows}</p>
                    <p className="text-xs text-white/80">Perlu Disetujui</p>
                  </div>
                </div>
                <div className="mt-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-2xl font-bold">{borrows.length}</p>
                  <p className="text-xs text-white/80">Total Transaksi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}