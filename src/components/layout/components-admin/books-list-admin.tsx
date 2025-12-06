import Link from "next/link";

export default async function BooksListAdmin() {
    interface Book {
        id: number;
        judul: string;
        penulis: string | null;
    }

    let listBooks: Book[] = [];

    try {
        const data = await fetch("http://localhost:8080/books", {
            method: "GET",
            cache: "no-store",
        });

        if (data.ok) {
            const json = await data.json();
            listBooks = json.data || [];
        }
    } catch (error) {
        console.error("Error fetching books:", error);
    }

    return (
        <section className="my-11 mx-10">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">Books</h2>

            {listBooks.length === 0 ? (
                <p className="text-center text-gray-500">Tidak ada buku tersedia</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {listBooks.map((b) => (
                    <div key={b.id} className="bg-white rounded-2xl p-5 border shadow hover:shadow-lg">
                        <div className="h-44 rounded-xl overflow-hidden bg-gray-200 mb-4">
                            {/* <img
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
                            /> */}
                        </div>

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
            )}
        </section>
    );
}
