import { Tag, BookOpen } from "lucide-react";

interface Category { 
    nama_kategori: string;
}

export default async function CategoriesBook() {
    try {
        const data = await fetch("http://localhost:8080/categories", {
            method: "GET",
            cache: "no-store",
        });

        if (!data.ok) {
            throw new Error("Failed to fetch categories");
        }

        const json = await data.json();
        const categories: Category[] = json.data || [];

        return (
            <section className="mt-14 mb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Kategori Buku</h2>
                            <p className="text-gray-600">Jelajahi buku berdasarkan kategori</p>
                        </div>
                        <Tag className="w-10 h-10 text-blue-600" />
                    </div>

                    {categories.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {categories.map((c, i) => (
                                <div
                                    key={i}
                                    className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-300"
                                >
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
                                            <BookOpen className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <p className="font-semibold text-gray-900 text-center group-hover:text-blue-600 transition-colors">
                                            {c.nama_kategori}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">Tidak ada kategori tersedia</p>
                        </div>
                    )}
                </div>
            </section>
        );
    } catch (error) {
        console.error("Error fetching categories:", error);
        return (
            <section className="mt-14 mb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Kategori Buku</h2>
                            <p className="text-gray-600">Jelajahi buku berdasarkan kategori</p>
                        </div>
                        <Tag className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                        <p className="text-red-600 font-medium">Gagal memuat kategori. Silakan coba lagi nanti.</p>
                    </div>
                </div>
            </section>
        );
    }
}