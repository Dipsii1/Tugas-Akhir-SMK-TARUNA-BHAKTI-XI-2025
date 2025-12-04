"use client";

import { useEffect, useState } from "react";

interface Loan {
  id: number;
  nama_user: string;
  judul_buku: string;
  tgl_peminjaman: string;
  tgl_pengembalian: string | null;
  status: string;
}

export default function AdminBorrowUI() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTanggal, setEditTanggal] = useState("");
  const [editStatus, setEditStatus] = useState("");

  // ========================
  // STATUS COLOR & LABEL
  // ========================
  const getStatusColor = (status: string) => {
    return status === "pending"
      ? "bg-yellow-500"
      : status === "accept"
      ? "bg-blue-600"
      : status === "late"
      ? "bg-red-600"
      : status === "returned"
      ? "bg-green-600"
      : status === "rejected"
      ? "bg-gray-700"
      : "bg-black";
  };

  const formatStatus = (status: string) => {
    return status === "accept"
      ? "accept"
      : status === "returned"
      ? "returned"
      : status === "pending"
      ? "pending"
      : status === "rejected"
      ? "rejected"
      : status === "late"
      ? "late"
      : status;
  };

  // ========================
  // FETCH DATA
  // ========================
  const fetchLoans = async () => {
    const res = await fetch("http://localhost:8080/borrowed");
    const json = await res.json();
    setLoans(json.data ?? []);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // ========================
  // EDIT HANDLER
  // ========================
  const openEdit = (loan: Loan) => {
    setEditId(loan.id);
    setEditTanggal(loan.tgl_pengembalian?.split("T")[0] || "");
    setEditStatus(loan.status);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTanggal("");
    setEditStatus("");
  };

  const saveEdit = async () => {
    if (!editId) return;

    await fetch(`http://localhost:8080/borrowed/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: editStatus,
        tgl_pengembalian: editTanggal || null,
      }),
    });

    cancelEdit();
    fetchLoans();
  };

  const deleteLoan = async (id: number) => {
    if (!confirm("Hapus data peminjaman?")) return;
    await fetch(`http://localhost:8080/borrowed/${id}`, { method: "DELETE" });
    fetchLoans();
  };

  // ========================
  // UI
  // ========================
  return (
    <div className="p-7 w-full">
      <h1 className="text-3xl font-bold mb-6">Data Peminjaman</h1>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left text-sm text-gray-700">
            <th className="p-3">#</th>
            <th className="p-3">Peminjam</th>
            <th className="p-3">Judul Buku</th>
            <th className="p-3">Tgl Pinjam</th>
            <th className="p-3">Tgl Kembali</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {loans.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-5 italic text-gray-500">
                Tidak ada data peminjaman
              </td>
            </tr>
          ) : (
            loans.map((loan, index) => (
              <tr key={loan.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{loan.nama_user}</td>
                <td className="p-3">{loan.judul_buku}</td>
                <td className="p-3">
                  {new Date(loan.tgl_peminjaman).toLocaleDateString()}
                </td>

                {/* TANGGAL & STATUS */}
                {editId === loan.id ? (
                  <>
                    <td className="p-3">
                      <input
                        type="date"
                        value={editTanggal}
                        onChange={(e) => setEditTanggal(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>

                    <td className="p-3">
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className={`p-1 rounded w-full text-white ${getStatusColor(editStatus)}`}
                      >
                        <option value="pending">pending</option>
                        <option value="accept">accept</option>
                        <option value="late">late</option>
                        <option value="returned">returned</option>
                        <option value="rejected">rejected</option>
                      </select>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3">
                      {loan.tgl_pengembalian
                        ? new Date(loan.tgl_pengembalian).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded text-white text-xs font-semibold ${getStatusColor(
                          loan.status
                        )}`}
                      >
                        {formatStatus(loan.status)}
                      </span>
                    </td>
                  </>
                )}

                {/* AKSI */}
                <td className="p-3 text-center">
                  {editId === loan.id ? (
                    <>
                      <button
                        onClick={saveEdit}
                        className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => openEdit(loan)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteLoan(loan.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Hapus
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
