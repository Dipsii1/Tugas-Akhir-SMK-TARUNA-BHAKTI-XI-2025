export default async function CategoriesBook() {

    interface Category { 
        nama_kategori: string;
    }
    
    const data = await fetch("http://localhost:8080/categories", {
        method: "GET",
        cache: "no-store",
    });

    const json = await data.json();
    const categories: Category[] = json.data;

    return (
        <section className="mt-14">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">Categories Book</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((c, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl p-6 shadow hover:shadow-lg cursor-pointer text-center border"
                    >
                        <p className="font-medium">{c.nama_kategori}</p>
                    </div>
                ))}
            </div>   
        </section>
    );
}
