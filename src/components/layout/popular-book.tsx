"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight, Loader2 } from "lucide-react";

interface Book {
  id: number;
  judul: string;
  penulis: string | null;
  cover: string | null;
}

export default function PopularBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }
        return res.json();
      })
      .then(json => {
        setBooks(json.data?.slice(0, 3) || []);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError("Gagal memuat buku populer");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="mt-14 mb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Buku Populer</h2>
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-500">Memuat buku populer...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-14 mb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Buku Populer</h2>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-14 mb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Buku Populer</h2>
            <p className="text-gray-600">Buku yang paling banyak dibaca</p>
          </div>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-20">
            <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Tidak ada buku populer tersedia</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((b) => (
              <Link key={b.id} href={`/buku/${b.id}`}>
                <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  {/* Cover Image */}
                  <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <img
                      src={
                        b.cover
                          ? `http://localhost:8080/uploads/books/${b.cover}`
                          : "/default-book-cover.png"
                      }
                      alt={b.judul}
                      onError={(e) => {
                        e.currentTarget.src = "/default-book-cover.png";
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>

                  {/* Book Info */}
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {b.judul}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {b.penulis ?? "Penulis tidak diketahui"}
                    </p>
                    
                    <div className="flex items-center text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                      <span>Lihat Detail</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}