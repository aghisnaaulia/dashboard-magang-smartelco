import { Component } from 'solid-js';
import ProductTable from '../components/ProductTable';
import './ProductPage.css';

const ProductPage: Component = () => {
  return (
    <div class="container">
      <aside class="sidebar">
        <h1>SANRIO</h1>
        <nav>
          <ul>
            <li>Beranda</li>
            <li class="active">Produk</li>
            <li>Keluar</li>
          </ul>
        </nav>
      </aside>
      <main class="main-content">
        <ProductTable />
      </main>
    </div>
  );
};

export default ProductPage;
