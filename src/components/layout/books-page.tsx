import Link from "next/link";

export default function BooksPage() {
    interface Book {
        id: string;
        judul: string;
        author: string;
    }

    const popularBooks: Book[] = [
        { id: "laskar-pelangi", judul: "Laskar Pelangi", author: "Andrea Hirata" },
        { id: "bumi", judul: "Bumi", author: "Tere Liye" },
    ];

    return (
        <section className="mt-10 mb-20 px-4 md:px-10 lg:px-20">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">
                Book List
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {popularBooks.map((b) => (
                    <div
                        key={b.id}
                        className="bg-white rounded-2xl p-4 border shadow hover:shadow-lg transition"
                    >
                        <div className="h-36 bg-gray-200 rounded-xl mb-4"></div>

                        <h3 className="font-semibold text-base">{b.judul}</h3>
                        <p className="text-gray-600 text-sm">{b.author}</p>

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
