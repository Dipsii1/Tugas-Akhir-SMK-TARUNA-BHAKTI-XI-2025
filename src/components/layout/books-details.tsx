"use client";

import { useState, useEffect } from "react";
import { Book } from "@/types/book";
import { BookOpen, Heart } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Popup */}
      {showPopup && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
          <div className={`${
            isSuccess ? "bg-green-500" : "bg-red-500"
          } text-white p-4 rounded-lg shadow-lg`}>
            <p className="font-medium text-center">{borrowMessage}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Book Cover */}
          <div className="md:w-1/3">
            <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-md">
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

          {/* Book Info */}
          <div className="md:w-2/3 flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {book.judul}
            </h1>
            
            <p className="text-gray-600 text-lg mb-4">
              {book.penulis || "Penulis tidak diketahui"}
            </p>

            <div className="flex gap-2 mb-6">
              <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium">
                {book.kategori || "Tanpa Kategori"}
              </span>
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                stokHabis 
                  ? "bg-red-100 text-red-700" 
                  : "bg-green-100 text-green-700"
              }`}>
                {stokHabis ? "Stok Habis" : `Stok: ${stok}`}
              </span>
            </div>

            <div className="mb-6 flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi</h2>
              <p className="text-gray-600 leading-relaxed">
                {book.deskripsi || "Tidak ada deskripsi."}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-auto">
              <button
                onClick={handleBorrow}
                disabled={stokHabis || loading}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition ${
                  stokHabis
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <BookOpen size={20} />
                {loading ? "Memproses..." : stokHabis ? "Stok Habis" : "Pinjam Buku"}
              </button>

              <button
                onClick={() => {
                  setBorrowMessage("Fitur favorit segera hadir!");
                  setIsSuccess(false);
                  setShowPopup(true);
                }}
                className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}