import Sidebar from '@/components/sidebar'
import BooksListAdmin from '@/components/layout/components-admin/books-list-admin'


export default async function booksListAdmin() {

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100">

            {/* Sidebar */}
            <Sidebar/>

            {/* Content */}
            <main className="flex-1">
                <BooksListAdmin />
            </main>

        </div>
    )

}