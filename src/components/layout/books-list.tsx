"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, Loader2 } from "lucide-react";

interface Book {
  id: number;
  judul: string;
  penulis: string | null;
  cover: string | null;
}

export default function BooksList() {
  const [booksList, setBooksList] = useState<Book[]>([]);
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
        setBooksList(json.data?.slice(0, 9) || []);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError("Gagal memuat daftar buku");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="mt-14 mb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Koleksi Buku</h2>
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-500">Memuat koleksi buku...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-14 mb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Koleksi Buku</h2>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Koleksi Buku</h2>
            <p className="text-gray-600">Temukan buku favorit Anda</p>
          </div>
          <BookOpen className="w-10 h-10 text-blue-600" />
        </div>

        {booksList.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Tidak ada buku tersedia</p>
          </div>
        ) : (
          <>
            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {booksList.map((b) => (
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
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* See All Button */}
            <div className="flex justify-center">
              <Link href="/buku">
                <button className="group flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium">
                  <span>Lihat Semua Buku</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}