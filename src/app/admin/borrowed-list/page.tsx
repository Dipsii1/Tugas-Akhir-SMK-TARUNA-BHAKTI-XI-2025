import Sidebar from '@/components/sidebar'
import BorrowedList from '@/components/layout/components-admin/borrowed-list'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


export default async function BorrowedPageAdmin() {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    console.log("Session User:", user);

    if (user.role !== 'admin') {
        redirect('/unauthorized')
    }
    
    return (
        <div className="flex">
            <Sidebar />
            <BorrowedList />
        </div>
    )
}