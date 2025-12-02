import Link from "next/link";

export default async function BooksPage() {
    interface Book {
        id: string;
        judul: string;
        penulis: string;
    }

    const data = await fetch("http://localhost:8080/books", {
        method: "GET",
        cache: "no-store",
    });

    const json = await data.json();
    const books: Book[] = json.data;

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
                        <div className="h-36 bg-gray-200 rounded-xl mb-4"></div>

                        <h3 className="font-semibold text-base">{b.judul}</h3>
                        <p className="text-gray-600 text-sm">{b.penulis}</p>

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
