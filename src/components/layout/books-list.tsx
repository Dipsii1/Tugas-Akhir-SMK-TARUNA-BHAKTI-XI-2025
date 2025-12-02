import Link from "next/link";

export default async function BooksList() {

    interface Book {
        id: number;
        judul: string;
        penulis: string | null;
    }

    const data = await fetch("http://localhost:8080/books", {
        method: "GET",
        cache: "no-store",
    });

    const json = await data.json();
    const listBooks: Book[] = json.data;

    const booksList = listBooks.slice(0, 9);

    return (
        <section className="mt-14 mb-20">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">Books</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {booksList.map((b) => (
                    <div key={b.id} className="bg-white rounded-2xl p-5 border shadow hover:shadow-lg">
                        <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>

                        <h3 className="font-semibold text-lg">{b.judul}</h3>
                        <p className="text-gray-600">{b.penulis ?? "Tidak ada penulis"}</p>

                        <Link href={`/buku/${b.id}`}>
                            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition text-sm">
                                Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="mt-32 flex justify-center">
                <Link href="/buku">
                    <button className="px-32 py-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm cursor-pointer">
                        See All Books
                    </button>
                </Link>
            </div>
        </section>
    );
}
