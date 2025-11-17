"use client";
import { Book } from "@/types/book";

export default function DetailBuku({ book } : { book: Book }) {
  return (
    <div className="px-8 mt-5 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Cover */}
        <div className="w-full md:w-1/4">
          <div className="w-full h-60 md:h-72 bg-gray-200 rounded-xl overflow-hidden shadow">
            <img
              src="/default-book-cover.png"
              alt="Book Cover"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Informasi */}
        <div className="flex-1 mt-2 md:mt-0">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">{book.judul}</h1>

          <p className="text-gray-700 text-lg mb-3">
            Penulis: <span className="font-medium">{book.author}</span>
          </p>

          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm mb-4">
            {book.kategori}
          </span>

          <p className="text-gray-600 leading-relaxed">
            {book.deskripsi}
          </p>

          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 shadow transition cursor-pointer">
            Pinjam Buku
          </button>
        </div>

      </div>
    </div>
  );
}
