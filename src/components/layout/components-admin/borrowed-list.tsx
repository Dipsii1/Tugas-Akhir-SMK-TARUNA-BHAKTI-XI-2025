import React from "react";

type Borrow = {
  id: number;
  id_user: number;
  id_buku: number;
  tgl_peminjaman: string;
  tgl_jatuh_tempo: string | null;
  tgl_pengembalian: string | null;
  status: "pending" | "accept" | "returned" | "late";
  catatan: string | null;
  judul_buku: string;
  penulis: string;
  nama_user: string;
  email_user: string;
};

export default async function BorrowedList() {
  const data = await fetch("http://localhost:8080/borrowed", {
    method: "GET",
    cache: "no-store",
  });

  const json = await data.json();
  const borrows: Borrow[] = json.data;

  return (
    <div className="p-10 w-[calc(100%-20rem)]">
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
          {borrows.map((borrow, index) => (
            <tr key={borrow.id} className="border-t hover:bg-gray-50 transition">
              <td className="p-3">{index + 1}</td>
              <td className="p-3 font-medium">{borrow.nama_user}</td>
              <td className="p-3">{borrow.judul_buku}</td>
              <td className="p-3">{new Date(borrow.tgl_peminjaman).toLocaleDateString()}</td>
              <td className="p-3">
                {borrow.tgl_pengembalian
                  ? new Date(borrow.tgl_pengembalian).toLocaleDateString()
                  : "-"}
              </td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded text-white capitalize ${
                    borrow.status === "pending"
                      ? "bg-yellow-600"
                      : borrow.status === "accept"
                      ? "bg-blue-600"
                      : borrow.status === "late"
                      ? "bg-red-600"
                      : "bg-green-600"
                  }`}
                >
                  {borrow.status === "accept" ? "Dipinjam" : borrow.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
