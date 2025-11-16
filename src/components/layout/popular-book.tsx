export default function PopularBooks() {

    interface Book {
        judul: string;
        author: string;
    }

    const popularBooks: Book[] = [
        { judul: "Laskar Pelangi", author: "Andrea Hirata" },
        { judul: "Bumi", author: "Tere Liye" },
        { judul: "Negeri 5 Menara", author: "Ahmad Fuadi" },
        { judul: "Filosofi Teras", author: "Henry Manampiring" },
        { judul: "Atomic Habits", author: "James Clear" },
        { judul: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
        { judul: "Dilan 1990", author: "Pidi Baiq" },
        { judul: "Pulang", author: "Tere Liye" },
        { judul: "Ayat-Ayat Cinta", author: "Habiburrahman El Shirazy" },
        { judul: "Komik Naruto Vol. 1", author: "Masashi Kishimoto" }
    ];

    const minimalPopularBooks = popularBooks.slice(0, 3);

    return (
        <section className="mt-14 mb-20">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">Popular Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {minimalPopularBooks.map((b) => (
                    <div key={b.judul} className="bg-white rounded-2xl p-5 border shadow hover:shadow-lg">
                        <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
                        <h3 className="font-semibold text-lg">{b.judul}</h3>
                        <p className="text-gray-600">{b.author}</p>
                        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700">
                            Pinjam
                        </button>
                    </div>
                ))}

            </div>
        </section>
    );
}
