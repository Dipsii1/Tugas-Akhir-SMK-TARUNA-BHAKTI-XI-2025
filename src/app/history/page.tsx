import SidebarUser from "@/components/sidebar-user";
import LoanListUI from "@/components/layout/books-loan";

export default function LoanPage() {
  return (
    <div className="flex">
      <SidebarUser />
      <LoanListUI />
    </div>
  );
}
