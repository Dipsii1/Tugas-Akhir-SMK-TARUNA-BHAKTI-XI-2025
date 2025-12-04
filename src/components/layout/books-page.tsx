"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Book {
  id: number;
  judul: string;
  penulis: string;
  cover: string | null;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then(res => res.json())
      .then(json => {
        setBooks(json.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading buku...
      </p>
    );
  }

  return (
    <section className="mt-10 mb-20 px-4 md:px-10 lg:px-20">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">
        Book List
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-2xl p-4 border shadow hover:shadow-lg transition"
          >
            {/* COVER */}
            <div className="h-44 rounded-xl overflow-hidden bg-gray-200 mb-4">
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
                className="w-full h-full object-cover"
              />
            </div>

            {/* INFO */}
            <h3 className="font-semibold text-base">{b.judul}</h3>
            <p className="text-gray-600 text-sm">{b.penulis}</p>

            {/* BUTTON */}
            <Link href={`/buku/${b.id}`}>
              <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition text-sm">
                Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
