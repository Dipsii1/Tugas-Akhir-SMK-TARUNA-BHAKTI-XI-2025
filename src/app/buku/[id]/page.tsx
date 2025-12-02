import BooksDetail from "@/components/layout/books-details";
import Sidebar from "@/components/sidebar-user";

export default async function BooksDetails({ params }: { params: { id: string } }) {

  const { id } = await params;

  const data = await fetch(`http://localhost:8080/books/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  const json = await data.json();
  const Book = json.data;

  console.log(Book);

  if (!Book) {
    return <h1 className="p-10 text-red-500 text-xl">Buku tidak ditemukan</h1>;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <BooksDetail book={Book} />
      </main>
    </div>
  );
}
