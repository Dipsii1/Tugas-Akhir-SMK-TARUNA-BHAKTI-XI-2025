import SidebarUser from '@/components/sidebar-user'
import UserSettings from '@/components/layout/settings-user'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


export default async function BorrowedPageAdmin() {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    console.log("Session User:", user);
    
    return (
        <div className="flex">
            <SidebarUser />
            <UserSettings />
        </div>
    )
}