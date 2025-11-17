import BooksDetail from "@/components/layout/books-details";
import Sidebar from "@/components/sidebar-user";

export default async function BooksDetails({ params }: { params: { id: string } }) {

  const { id } = await params;

  const Books = [
    { id: "laskar-pelangi", judul: "Laskar Pelangi", author: "Andrea Hirata", kategori: "Fiksi", deskripsi: "Kisah inspiratif anak-anak di Belitong" },
    { id: "bumi", judul: "Bumi", author: "Tere Liye", kategori: "Fiksi", deskripsi: "Petualangan seorang gadis di bumi" },
  ]

  const Book = Books.find((b) => b.id === id);

  if (!Book) {
    return <h1 className="p-10 text-red-500 text-xl">Buku tidak ditemukan</h1>;
  }


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <main className="flex-1 p-6">
        <BooksDetail book={Book} />
      </main>
    </div>
  )
}
