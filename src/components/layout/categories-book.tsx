export default function CategoriesBook() {

    const categories = ["Pelajaran", "Fiksi", "Nonfiksi", "Referensi", "Komik", "Biografi", "Teknologi", "Novel"]   
    
    return (
        <section className="mt-14">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">Categories Book</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((item) => (
                    <div
                        key={item}
                        className="bg-white rounded-2xl p-6 shadow hover:shadow-lg cursor-pointer text-center border"
                    >
                        <p className="font-medium">{item}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}