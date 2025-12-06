"use client";

import { useEffect, useState } from "react";

interface Loan {
  id: number;
  nama_user: string;
  judul_buku: string;
  tgl_peminjaman: string;
  tgl_pengembalian: string | null;
  status: string;
  catatan: string | null;
}

export default function AdminBorrowUI() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTanggal, setEditTanggal] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editCatatan, setEditCatatan] = useState("");

  const getStatusColor = (status: string) => {
    return status === "pending"
      ? "bg-yellow-500"
      : status === "accept"
      ? "bg-green-600"
      : status === "taken"
      ? "bg-purple-600"
      : status === "late"
      ? "bg-orange-600"
      : status === "returned"
      ? "bg-blue-600"
      : "bg-gray-600";
  };

  const fetchLoans = async () => {
    try {
      const res = await fetch("http://localhost:8080/borrowed");
      
      if (!res.ok) {
        throw new Error("Failed to fetch loans");
      }
      
      const json = await res.json();
      setLoans(json.data ?? []);
    } catch (error) {
      console.error("Error fetching loans:", error);
      setLoans([]);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // =============================
  // UPDATE STATUS DIRECT
  // =============================
  const updateStatusDirect = async (id: number, status: string) => {
    try {
      const res = await fetch(`http://localhost:8080/borrowed/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      fetchLoans();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Gagal mengupdate status");
    }
  };

  // =============================
  // MASUK MODE EDIT
  // =============================
  const openEdit = (loan: Loan) => {
    setEditId(loan.id);
    setEditTanggal(loan.tgl_pengembalian?.split("T")[0] || "");
    setEditStatus(loan.status);
    setEditCatatan(loan.catatan || "");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTanggal("");
    setEditStatus("");
    setEditCatatan("");
  };

  // =============================
  // SIMPAN EDIT
  // =============================
  const saveEdit = async () => {
    if (!editId) return;

    try {
      const res = await fetch(`http://localhost:8080/borrowed/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          tgl_pengembalian: editTanggal || null,
          catatan: editCatatan || null,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update loan");
      }

      cancelEdit();
      fetchLoans();
    } catch (error) {
      console.error("Error updating loan:", error);
      alert("Gagal menyimpan perubahan");
    }
  };

  // =============================
  // DELETE
  // =============================
  const deleteLoan = async (id: number) => {
    if (!confirm("Hapus data peminjaman?")) return;

    try {
      const res = await fetch(`http://localhost:8080/borrowed/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete loan");
      }

      fetchLoans();
    } catch (error) {
      console.error("Error deleting loan:", error);
      alert("Gagal menghapus data peminjaman");
    }
  };

  return (
    <div className="p-7 flex-1 overflow-x-auto">
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
            <th className="p-3">Catatan</th>
            <th className="p-3 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {loans.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center p-5 italic text-gray-500">
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

                {/* ============================= 
                    MODE EDIT
                ============================= */}
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
                        className={`p-1 rounded w-full text-white ${getStatusColor(
                          editStatus
                        )}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="accept">Accept</option>
                        <option value="taken">Taken</option>
                        <option value="late">Late</option>
                        <option value="returned">Returned</option>
                      </select>
                    </td>

                    <td className="p-3">
                      <input
                        type="text"
                        value={editCatatan}
                        onChange={(e) => setEditCatatan(e.target.value)}
                        placeholder="Catatan..."
                        className="border px-2 py-1 rounded w-full"
                      />
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
                        className={`px-3 py-1 rounded text-white text-xs font-semibold uppercase ${getStatusColor(
                          loan.status
                        )}`}
                      >
                        {loan.status}
                      </span>
                    </td>

                    <td className="p-3 text-xs text-gray-600">
                      {loan.catatan || "-"}
                    </td>
                  </>
                )}

                {/* =============================
                    4 TOMBOL AKSI
                ============================= */}
                <td className="p-3 flex gap-2 justify-center">

                  {editId === loan.id ? (
                    <>
                      <button
                        onClick={saveEdit}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    <>
                      {/* ACCEPT hanya jika masih pending */}
                      {loan.status === "pending" && (
                        <button
                          onClick={() =>
                            updateStatusDirect(loan.id, "accept")
                          }
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Accept
                        </button>
                      )}

                      {/* EDIT */}
                      <button
                        onClick={() => openEdit(loan)}
                        className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                      >
                        Edit
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => deleteLoan(loan.id)}
                        className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
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
