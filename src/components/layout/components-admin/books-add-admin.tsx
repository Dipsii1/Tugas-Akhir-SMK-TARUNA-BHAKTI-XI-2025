"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function AddBook() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // Fetch kategori
  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        return res.json();
      })
      .then((json) => setCategories(json.data || []))
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
        setCategories([]);
      });
  }, []);

  // Handle file preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget; // 👈 Simpan referensi form dulu

    try {
      const formData = new FormData(form);

      const response = await fetch("http://localhost:8080/books", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      const result = await response.json();
      setLoading(false);

      if (result.success) {
        alert("Buku berhasil ditambahkan!");
        form.reset();
        setPreview(null);
      } else {
        alert("Gagal menambahkan buku: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat menambahkan buku.";
      alert(errorMessage);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-extrabold mb-6">Tambah Buku Baru</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        encType="multipart/form-data"
      >
        {/* LEFT */}
        <div className="space-y-5">
          <div>
            <Label>Judul Buku</Label>
            <Input name="judul" placeholder="Masukkan judul buku" required />
          </div>

          <div>
            <Label>Penulis</Label>
            <Input name="penulis" placeholder="Nama penulis" required />
          </div>

          <div>
            <Label>ISBN</Label>
            <Input name="ISBN" placeholder="ISBN" required />
          </div>

          <div>
            <Label>Tahun Terbit</Label>
            <Input
              type="number"
              name="tahun_terbit"
              placeholder="2020"
              required
            />
          </div>

          <div>
            <Label>Penerbit</Label>
            <Input name="penerbit" placeholder="Nama penerbit" required />
          </div>

          <div>
            <Label>Deskripsi</Label>
            <textarea
              name="deskripsi"
              placeholder="Tuliskan deskripsi buku..."
              required
              className="border rounded w-full p-2 h-24"
            />
          </div>

          <div>
            <Label>Kategori</Label>
            <select
              name="id_kategori"
              className="border w-full p-2 rounded"
              required
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nama_kategori}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-5">
          <div>
            <Label>Jumlah Buku (Stok)</Label>
            <Input
              type="number"
              name="jumlah_total"
              placeholder="Contoh: 10"
              required
            />
          </div>

          <div>
            <Label>Cover Buku</Label>
            <Input
              type="file"
              name="cover"
              accept="image/*"
              onChange={handleFileChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview Cover"
                className="w-32 h-32 object-cover mt-2 border rounded"
              />
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-lg font-semibold"
          >
            {loading ? "Menyimpan..." : "Tambah Buku"}
          </Button>
        </div>
      </form>
    </div>
  );
}