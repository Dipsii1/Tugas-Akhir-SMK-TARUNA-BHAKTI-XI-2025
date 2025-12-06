import BooksDetail from "@/components/layout/books-details";
import Sidebar from "@/components/sidebar-user";

export default async function BooksDetails({ params }: { params: { id: string } }) {
  const { id } = await params;

  let Book = null;

  try {
    const data = await fetch(`http://localhost:8080/books/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!data.ok) {
      throw new Error("Failed to fetch book");
    }

    const json = await data.json();
    Book = json.data;
  } catch (error) {
    console.error("Error fetching book:", error);
  }

  if (!Book) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100">
        <div className="flex-1 p-6 flex items-center justify-center">
          <h1 className="text-red-500 text-xl">Buku tidak ditemukan</h1>
        </div>
      </div>
    );
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
