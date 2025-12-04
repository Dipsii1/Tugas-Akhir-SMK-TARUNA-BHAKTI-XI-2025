import AddBook from '@/components/layout/components-admin/books-add-admin'
import Sidebar from "@/components/sidebar";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function AddBookPage () {

    const session = await getServerSession(authOptions);
        const user = session?.user;
    
        console.log("Session User:", user);
    
        if (user.role !== 'admin') {
            redirect('/unauthorized')
        }

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
