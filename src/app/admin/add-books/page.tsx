import AddBook from '@/components/layout/components-admin/books-add-admin'
import Sidebar from "@/components/sidebar";

export default function AddBookPage () {
    return (
        <div className="flex">
            {/* Sidebar kiri */}
            <Sidebar />

            {/* Konten utama */}
            <main className="flex-1">
                <AddBook />
            </main>
        </div>
    )
}
