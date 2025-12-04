import Sidebar from '@/components/sidebar'
import BooksListAdmin from '@/components/layout/components-admin/books-list-admin'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


export default async function booksListAdmin() {

    const session = await getServerSession(authOptions);
        const user = session?.user;
    
        console.log("Session User:", user);
    
        if (user.role !== 'admin') {
            redirect('/unauthorized')
        }

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