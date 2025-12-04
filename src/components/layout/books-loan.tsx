"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Loan {
  id: number;
  nama_user: string;
  judul_buku: string;
  tgl_peminjaman: string;
  tgl_pengembalian: string | null;
  status: string;
}

export default function LoanListUI() {
  const { data: session, status } = useSession();
  const [loans, setLoans] = useState<Loan[]>([]);

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId || status !== "authenticated") return;

    const fetchLoans = async () => {
      try {
        const res = await fetch(`http://localhost:8080/borrowed/user/${userId}`);
        const json = await res.json();
        setLoans(json.data ?? []);
      } catch (error) {
        console.error("Error fetch loans:", error);
        setLoans([]);
      }
    };

    fetchLoans();
  }, [status, userId]);

  return (
    <div className="p-7 w-full">
      <h1 className="text-3xl font-bold mb-6">Peminjaman Buku</h1>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left text-sm text-gray-700">
            <th className="p-3">#</th>
            <th className="p-3">Peminjam</th>
            <th className="p-3">Judul Buku</th>
            <th className="p-3">Tgl Pinjam</th>
            <th className="p-3">Tgl Kembali</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {loans.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-3 text-center italic text-gray-500">
                Belum ada peminjaman
              </td>
            </tr>
          ) : (
            loans.map((loan, index) => (
              <tr key={loan.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">{loan.nama_user}</td>
                <td className="p-3">{loan.judul_buku}</td>
                <td className="p-3">{loan.tgl_peminjaman ? new Date(loan.tgl_peminjaman).toLocaleDateString() : "-"}</td>
                <td className="p-3">{loan.tgl_pengembalian ? new Date(loan.tgl_pengembalian).toLocaleDateString() : "-"}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-white text-xs capitalize font-semibold
      ${loan.status === "pending"
                        ? "bg-yellow-500"
                        : loan.status === "accept"
                          ? "bg-blue-600"
                          : loan.status === "late"
                            ? "bg-red-600"
                            : loan.status === "returned"
                              ? "bg-green-600"
                              : loan.status === "rejected"
                                ? "bg-gray-600"
                                : "bg-black"
                      }
                      `}
                  >
                    {loan.status === "accept"
                      ? "dipinjam"
                      : loan.status === "returned"
                        ? "dikembalikan"
                        : loan.status === "pending"
                          ? "menunggu"
                          : loan.status === "rejected"
                            ? "ditolak"
                            : loan.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
