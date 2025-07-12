import Link from 'next/link'
import Image from 'next/image'

// Data produk (bisa juga diambil dari API/database)
const produkHosting = [
  {
    id: 1,
    nama: "Hosting Bisnis",
    deskripsi: "Solusi hosting cepat dan handal untuk kebutuhan bisnis Anda dengan uptime 99.9%",
    harga: "Rp 149.000/bln",
    hargaDiskon: "Rp 199.000",
    fitur: ["10 GB SSD", "Unlimited Bandwidth", "100 Akun Email", "Gratis Domain", "SSL Gratis", "Backup Mingguan"],
    gambar: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    populer: true
  },
  {
    id: 2,
    nama: "Hosting Developer",
    deskripsi: "Hosting khusus developer dengan akses SSH dan dukungan berbagai bahasa pemrograman",
    harga: "Rp 199.000/bln",
    fitur: ["20 GB SSD", "Unmetered Bandwidth", "Node.js & Python", "Database Manager", "Terminal Akses", "Git Integration"],
    gambar: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
  },
  {
    id: 3,
    nama: "Hosting WordPress",
    deskripsi: "Hosting dioptimalkan khusus untuk WordPress dengan instalasi 1-klik",
    harga: "Rp 129.000/bln",
    hargaDiskon: "Rp 159.000",
    fitur: ["15 GB SSD", "CDN Gratis", "Auto Update WordPress", "Backup Harian", "Theme & Plugin Manager", "Staging Environment"],
    gambar: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    populer: true
  },
  {
    id: 4,
    nama: "Cloud VPS",
    deskripsi: "Virtual Private Server dengan resource dedicated dan kontrol penuh",
    harga: "Rp 299.000/bln",
    fitur: ["2 vCPU Cores", "4 GB RAM", "50 GB SSD", "5 TB Bandwidth", "Root Akses", "Dedicated IP"],
    gambar: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
  },
  {
    id: 5,
    nama: "Email Hosting",
    deskripsi: "Solusi profesional untuk email bisnis dengan keamanan terbaik",
    harga: "Rp 89.000/bln",
    fitur: ["10 GB Penyimpanan", "50 Akun Email", "Anti-Spam & Anti-Virus", "Webmail & Mobile Sync", "Kalender Sharing", "IMAP/POP3 Support"],
    gambar: "https://images.unsplash.com/photo-1600132806608-231446b2e7af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: 6,
    nama: "Hosting E-Commerce",
    deskripsi: "Hosting optimal untuk toko online dengan keamanan transaksi",
    harga: "Rp 229.000/bln",
    fitur: ["30 GB SSD", "Unlimited Bandwidth", "Free SSL Premium", "One-Click Shopping Cart", "Payment Gateway Support", "Priority Support"],
    gambar: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  }
]

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Paket Hosting Profesional
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Pilih paket hosting yang sesuai dengan kebutuhan website Anda
        </p>
      </div>

      {/* Filter Kategori */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium">
          Semua Produk
        </button>
        <button className="px-6 py-2 border border-gray-300 rounded-full font-medium hover:bg-gray-50">
          Shared Hosting
        </button>
        <button className="px-6 py-2 border border-gray-300 rounded-full font-medium hover:bg-gray-50">
          VPS Hosting
        </button>
        <button className="px-6 py-2 border border-gray-300 rounded-full font-medium hover:bg-gray-50">
          Email Hosting
        </button>
      </div>

      {/* Daftar Produk */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {produkHosting.map((produk) => (
          <div 
            key={produk.id} 
            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border ${
              produk.populer ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
            }`}
          >
            {produk.populer && (
              <div className="bg-blue-600 text-white text-center py-1 text-sm font-bold">
                POPULER
              </div>
            )}
            <div className="relative h-48 w-full">
              <Image
                src={produk.gambar}
                alt={produk.nama}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{produk.nama}</h3>
                {produk.populer && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">{produk.deskripsi}</p>
              
              <div className="mb-4">
                <span className="text-2xl font-bold text-blue-600">{produk.harga}</span>
                {produk.hargaDiskon && (
                  <span className="ml-2 text-sm text-gray-500 line-through">{produk.hargaDiskon}</span>
                )}
              </div>
              
              <ul className="space-y-2 mb-6">
                {produk.fitur.slice(0, 4).map((fitur, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{fitur}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex space-x-3">
                <Link
                  href={`/products/${produk.id}`}
                  className="flex-1 text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Detail
                </Link>
                <Link
                  href={`/pesan/${produk.id}`}
                  className="flex-1 text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  Pesan
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Tambahan */}
      <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Butuh Hosting Khusus?</h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Kami juga menyediakan solusi hosting khusus untuk kebutuhan spesifik dengan resource dedicated dan konfigurasi khusus.
        </p>
        <button className="px-6 py-3 bg-white border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 hover:bg-gray-50">
          Konsultasi Gratis
        </button>
      </div>
    </div>
  )
}