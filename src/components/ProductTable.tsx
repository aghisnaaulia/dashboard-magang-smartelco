import { Component, For, createSignal } from 'solid-js';
import './ProductTable.css';

type produk = {
    ID_produk: string;
    nama_produk: string;
    jenis: string;
    lokasi: string;
    harga: string;
    stok: number;
};

const ProductTable: Component = () => {
    const [products, setProducts] = createSignal<produk[]>([
        {
            ID_produk: "SR001",
            nama_produk: "Hello Kitty Plushie",
            jenis: "Boneka",
            lokasi: "Gudang A",
            harga: "Rp295.800",
            stok: 150
        },
    ]);

    const [showForm, setShowForm] = createSignal(false);
    const [formData, setFormData] = createSignal<produk>({
        ID_produk: '',
        nama_produk: '',
        jenis: '',
        lokasi: '',
        harga: '',
        stok: 0,
    });

    const [editIndex, setEditIndex] = createSignal<number | null>(null);

    const openAddForm = () => {
        setFormData({ ID_produk: '', nama_produk: '', jenis: '', lokasi: '', harga: '', stok: 0 });
        setEditIndex(null);
        setShowForm(true);
    };

    const openEditForm = (index: number) => {
        setFormData({ ...products()[index] });
        setEditIndex(index);
        setShowForm(true);
    };

    const handleSubmitForm = () => {
        if (editIndex() !== null) {
            const updated = [...products()];
            updated[editIndex()!] = formData();
            setProducts(updated);
        } else {
            setProducts([...products(), formData()]);
        }
        setShowForm(false);
        setEditIndex(null);
        setFormData({ ID_produk: '', nama_produk: '', jenis: '', lokasi: '', harga: '', stok: 0 });
    };

    const handleDelete = (index: number) => {
        const updated = [...products()];
        updated.splice(index, 1); // hapus 1 item di posisi index
        setProducts(updated);
    };

    return (
        <div class="table-container">
            <div class="table-header">
                <h2>Produk</h2>
                <div class="form-actions">
                    <button onClick={openAddForm}>Tambah Produk +</button>
                </div>
            </div>

            {showForm() && (
                <div class="form-popup">
                    <h3>{editIndex() !== null ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
                    <div class="form-grid">
                        <input
                            type="text"
                            placeholder="ID"
                            value={formData().ID_produk}
                            onInput={(e) => setFormData({ ...formData(), ID_barang: e.currentTarget.value })}
                        />
                        <input
                            type="text"
                            placeholder="Produk"
                            value={formData().nama_produk}
                            onInput={(e) => setFormData({ ...formData(), product: e.currentTarget.value })}
                        />
                        <input
                            type="text"
                            placeholder="Jenis Barang"
                            value={formData().jenis}
                            onInput={(e) => setFormData({ ...formData(), jenisBarang: e.currentTarget.value })}
                        />
                        <input
                            type="text"
                            placeholder="Lokasi"
                            value={formData().lokasi}
                            onInput={(e) => setFormData({ ...formData(), lokasi: e.currentTarget.value })}
                        />
                        <input
                            type="text"
                            placeholder="Harga"
                            value={formData().harga}
                            onInput={(e) => setFormData({ ...formData(), harga: e.currentTarget.value })}
                        />
                        <input
                            type="number"
                            placeholder="Stok"
                            value={formData().stok}
                            onInput={(e) => setFormData({ ...formData(), stok: +e.currentTarget.value })}
                        />
                    </div>
                    <div class="form-actions">
                        <button onClick={handleSubmitForm}>
                            {editIndex() !== null ? 'Simpan' : 'Simpan'}
                        </button>
                        <button onClick={() => setShowForm(false)}>Kembali</button>
                    </div>
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produk</th>
                        <th>Jenis Barang</th>
                        <th>Lokasi</th>
                        <th>Harga</th>
                        <th>Stok</th>
                        <th>Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    <For each={products()}>
                        {(item, index) => (
                            <tr>
                                <td>{item.ID_produk}</td>
                                <td>{item.nama_produk}</td>
                                <td>{item.jenis}</td>
                                <td>{item.lokasi}</td>
                                <td>{item.harga}</td>
                                <td>{item.stok}</td>
                                <td>
                                    <button onClick={() => openEditForm(index())}>Edit</button>
                                    {' | '}
                                    <button onClick={() => handleDelete(index())}>Hapus</button>
                                </td>

                            </tr>
                        )}
                    </For>
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
