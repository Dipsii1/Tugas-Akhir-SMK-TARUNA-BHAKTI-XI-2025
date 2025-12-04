"use client";

import { useState } from "react";
import { Book } from "@/types/book";
import { BookOpen, Heart } from "lucide-react";
import { useSession } from "next-auth/react";

export default function DetailBuku({ book }: { book: Book }) {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [borrowMessage, setBorrowMessage] = useState("");

  const stok = book.jumlah_tersedia ?? 0;
  const stokHabis = stok <= 0;

  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const handleBorrow = async () => {
    if (status === "loading" || loading || stokHabis) return;

    if (!session || !userId) {
      setBorrowMessage("Silakan login terlebih dahulu.");
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

    } catch (error) {
      setBorrowMessage(error.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
      setShowPopup(true);
    }
  };

  return (
    <div className="px-8 mt-5 max-w-7xl mx-auto">
      {showPopup && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-white p-4 rounded-xl shadow-xl z-50 w-[90%] max-w-md border animate-slideDown">
          <h2 className="text-lg font-semibold text-blue-700 text-center">
            {borrowMessage}
          </h2>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <div className="w-full h-60 md:h-72 bg-gray-200 rounded-xl overflow-hidden shadow">
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

        <div className="flex-1 mt-2 md:mt-0">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">{book.judul}</h1>
          <p className="text-gray-700 text-lg mb-3">
            Penulis: <span className="font-medium">{book.penulis || "-"}</span>
          </p>

          <span className="inline-block bg-blue-200 text-blue-700 px-4 py-1 rounded-full text-sm mb-2">
            {book.kategori || "Tidak ada kategori"}
          </span>

          <span
            className={`inline-block px-4 py-1 rounded-full text-sm mb-2 ml-2 ${stokHabis ? "bg-red-100 text-red-700" : "bg-blue-200 text-blue-700"
              }`}
          >
            {stokHabis ? "Stok Habis" : `Stok: ${stok}`}
          </span>

          <p className="text-gray-600 leading-relaxed">{book.deskripsi}</p>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleBorrow}
              disabled={stokHabis || loading || status === "loading"}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl shadow transition cursor-pointer ${stokHabis
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
            >
              <BookOpen size={20} />
              {loading ? "Meminjam..." : stokHabis ? "Stok Habis" : "Pinjam Buku"}
            </button>

            <button
              onClick={() => {
                setBorrowMessage("Fitur favorit coming soon!");
                setShowPopup(true);
              }}
              className="flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 shadow transition cursor-pointer"
            >
              <Heart size={20} />
              Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
