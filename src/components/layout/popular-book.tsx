"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Book {
  id: number;
  judul: string;
  penulis: string;
  cover: string | null;
}

export default function PopularBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then(res => res.json())
      .then(json => {
        setBooks(json.data.slice(0, 3));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="mt-14 mb-20">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">
        Popular Books
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {books.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-2xl p-5 border shadow hover:shadow-lg"
          >
            {/* COVER */}
            <div className="h-40 rounded-xl overflow-hidden bg-gray-200 mb-4">
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
            <h3 className="font-semibold text-lg">{b.judul}</h3>
            <p className="text-gray-600">{b.penulis}</p>

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
