import Sidebar from '@/components/sidebar'
import BorrowedList from '@/components/layout/components-admin/borrowed-list'


export default function BorrowedPageAdmin() {
    return (
        <div className="flex">
            <Sidebar/>
            <BorrowedList />
        </div>
    )
}