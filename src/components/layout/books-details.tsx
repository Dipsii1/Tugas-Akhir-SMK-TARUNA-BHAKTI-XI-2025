"use client";

import { useState, useEffect } from "react";
import { Book } from "@/types/book";
import { BookOpen, Heart, CheckCircle, XCircle } from "lucide-react";
import { useSession } from "next-auth/react";

export default function DetailBuku({ book }: { book: Book }) {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [borrowMessage, setBorrowMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const stok = book.jumlah_tersedia ?? 0;
  const stokHabis = stok <= 0;

  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const handleBorrow = async () => {
    if (status === "loading" || loading || stokHabis) return;

    if (!session || !userId) {
      setBorrowMessage("Silakan login terlebih dahulu.");
      setIsSuccess(false);
      setShowPopup(true);
      return;
    }

    setLoading(true);

    try {
      const data = await fetch("http://localhost:8080/borrowed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_buku: book.id,
          id_user: userId
        }),
      });

      const json = await data.json();

      if (!data.ok) {
        throw new Error(json.message || "Gagal meminjam buku.");
      }

      setBorrowMessage(`Buku "${book.judul}" berhasil dipinjam!`);
      setIsSuccess(true);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan.";
      setBorrowMessage(errorMessage);
      setIsSuccess(false);
    } finally {
      setLoading(false);
      setShowPopup(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 py-12 px-4">
      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md animate-slideDown">
          <div className={`${
            isSuccess 
              ? "bg-blue-600 border-blue-700" 
              : "bg-gray-900 border-gray-800"
          } border-2 text-white p-4 rounded-xl shadow-2xl`}>
            <div className="flex items-center gap-3">
              {isSuccess ? (
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 flex-shrink-0" />
              )}
              <p className="font-semibold">{borrowMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Card */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-5 gap-0">
            {/* Left Section - Book Cover */}
            <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-10 flex items-center justify-center">
              <div className="w-full max-w-sm">
                <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/20 transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={
                      book.cover
                        ? `http://localhost:8080/uploads/books/${book.cover}`
                        : "/default-book-cover.png"
                    }
                    alt={book.judul}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Section - Book Details */}
            <div className="md:col-span-3 p-8 md:p-12">
              {/* Title & Author */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {book.judul}
                </h1>
                <p className="text-xl text-gray-600">
                  {book.penulis || "Penulis tidak diketahui"}
                </p>
              </div>

              {/* Category & Stock Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2.5 rounded-full text-sm font-semibold">
                  <BookOpen size={16} />
                  {book.kategori || "Tanpa Kategori"}
                </span>
                <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold ${
                  stokHabis 
                    ? "bg-gray-900 text-white" 
                    : stok <= 3
                    ? "bg-gray-800 text-white"
                    : "bg-blue-600 text-white"
                }`}>
                  {stokHabis ? "Stok Habis" : `${stok} Tersedia`}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"></div>

              {/* Description */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {book.deskripsi || "Tidak ada deskripsi tersedia untuk buku ini."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBorrow}
                  disabled={stokHabis || loading}
                  className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${
                    stokHabis
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : loading
                      ? "bg-blue-400 text-white cursor-wait"
                      : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl hover:-translate-y-0.5"
                  }`}
                >
                  <BookOpen size={22} />
                  {loading ? "Memproses..." : stokHabis ? "Stok Habis" : "Pinjam Buku"}
                </button>

                <button
                  onClick={() => {
                    setBorrowMessage("Fitur favorit segera hadir!");
                    setIsSuccess(false);
                    setShowPopup(true);
                  }}
                  className="sm:w-auto flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Heart size={22} />
                  <span className="hidden sm:inline">Favorit</span>
                </button>
              </div>

              {/* Stock Warning */}
              {!stokHabis && stok <= 3 && (
                <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-4 rounded-lg">
                  <p className="text-blue-900 font-semibold text-sm">
                    ⚡ Stok terbatas! Hanya tersisa {stok} buku. Segera pinjam sebelum kehabisan!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -30px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}