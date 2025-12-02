export interface Book {
  id: number;
  judul: string;
  penulis: string | null;
  penerbit: string | null;
  deskripsi: string | null;
  kategori: string | null;
  jumlah_total: number;
  jumlah_tersedia: number;
}
