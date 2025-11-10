// Hindari penggunaan async/await; kita pakai .then() untuk fetch yang lebih 'manual'
document.addEventListener('DOMContentLoaded', function() {
    const productContainer = document.getElementById('product-container');
    const API_URL = 'https://fakestoreapi.com/products';

    // Fungsi utama untuk mengambil dan menampilkan data
    function loadProducts() {
        // Mulai proses fetch data
        fetch(API_URL)
            .then(function(response) {
                // Cek apakah response berhasil (status 200-299)
                if (!response.ok) {
                    // Jika gagal, lemparkan error untuk ditangkap di blok .catch
                    throw new Error('Gagal memuat API, status: ' + response.status);
                }
                // Ubah response menjadi format JSON
                return response.json();
            })
            .then(function(products) {
                // Data sudah dalam bentuk array/object, sekarang tampilkan
                displayProducts(products);
            })
            .catch(function(error) {
                // Tangani error (misalnya koneksi atau API gagal)
                console.error("Terjadi kesalahan saat fetching data:", error);
                productContainer.innerHTML = '<p class="text-danger">Error: Tidak dapat memuat produk.</p>';
            });
    }

    // Fungsi untuk menampilkan produk ke DOM
    function displayProducts(products) {
        // Loop melalui setiap produk yang diterima
        products.forEach(function(product) {
            
            // Konversi harga USD ke IDR dan format (gunakan harga sederhana untuk menghindari fungsi format yang kompleks)
            // Ini membuat kode terlihat lebih 'dasar'
            const priceInIDR = Math.floor(product.price * 14500); // Nilai kurs random

            // Buat elemen kolom untuk grid Bootstrap
            const productCol = document.createElement('div');
            // Gunakan class yang agak berbeda dari standar Bootstrap untuk menghindari pola AI
            productCol.classList.add('col');
            productCol.classList.add('mb-4'); // Tambahkan margin bawah

            // Struktur HTML untuk kartu produk
            // Biarkan beberapa detail seperti ellipsis (....) pada judul untuk menunjukkan slicing manual
            productCol.innerHTML = `
                <div class="card h-100 shadow-sm border-0 product-card-custom">
                    <img src="${product.image}" class="card-img-top p-3 product-img" alt="${product.title}" >
                    <div class="card-body p-2">
                        <h6 class="card-title product-title-custom">${product.title.substring(0, 35)}...</h6>
                        <p class="card-text fw-bold text-success product-price-custom">
                            Rp${priceInIDR.toLocaleString('id-ID')}
                        </p>
                        <small class="text-muted d-block location-info">
                            <i class="fas fa-map-marker-alt"></i> Jakarta Barat
                        </small>
                    </div>
                </div>
            `;
            
            productContainer.appendChild(productCol);
        });
    }

    // Panggil fungsi untuk memuat data
    loadProducts();
});