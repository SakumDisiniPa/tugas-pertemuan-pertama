import Image from 'next/image'
import Link from 'next/link'

// Data produk bisa juga diambil dari API/database
const produkHosting = [
  {
    id: 1,
    nama: "Hosting Bisnis",
    deskripsi: "Solusi hosting cepat dan handal untuk kebutuhan bisnis Anda dengan uptime 99.9%. Hosting ini cocok untuk website perusahaan, toko online kecil, dan portofolio profesional.",
    harga: "Rp 149.000/bln",
    hargaDiskon: "Rp 199.000",
    fitur: [
      "10 GB SSD Storage",
      "Unlimited Bandwidth",
      "100 Akun Email Profesional",
      "Gratis Domain .COM/.NET",
      "SSL Gratis Selamanya",
      "Backup Mingguan Otomatis"
    ],
    gambar: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    spesifikasi: {
      processor: "2 Core",
      memory: "2 GB",
      database: "Unlimited MySQL",
      addonDomain: "5 Domain",
      dukungan: "24/7 Priority Support"
    }
  },
  {
    id: 2,
    nama: "Hosting Developer",
    deskripsi: "Hosting khusus developer dengan akses SSH penuh dan dukungan berbagai bahasa pemrograman modern. Ideal untuk pengembangan aplikasi web dan testing environment.",
    harga: "Rp 199.000/bln",
    fitur: [
      "20 GB SSD Storage",
      "Unmetered Bandwidth",
      "Akses SSH & Git",
      "Node.js, Python & Ruby Support",
      "Database Manager",
      "Terminal Online"
    ],
    gambar: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    spesifikasi: {
      processor: "4 Core",
      memory: "4 GB",
      database: "MySQL & MongoDB",
      addonDomain: "Unlimited",
      dukungan: "Developer Support"
    }
  },
  {
    id: 3,
    nama: "Hosting WordPress",
    deskripsi: "Hosting dioptimalkan khusus untuk WordPress dengan instalasi 1-klik dan berbagai fitur khusus CMS WordPress. Kecepatan loading hingga 3x lebih cepat.",
    harga: "Rp 129.000/bln",
    hargaDiskon: "Rp 159.000",
    fitur: [
      "15 GB SSD Storage",
      "CDN Gratis Global",
      "Auto Update WordPress",
      "Backup Harian Otomatis",
      "Staging Environment",
      "Theme & Plugin Manager"
    ],
    gambar: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    spesifikasi: {
      processor: "2 Core",
      memory: "3 GB",
      database: "MySQL Optimized",
      addonDomain: "3 Domain",
      dukungan: "WordPress Expert"
    }
  }
]

export default function ProductPage({ params }) {
  const { id } = params
  const produk = produkHosting.find(p => p.id === Number(id))

  if (!produk) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Produk tidak ditemukan</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Kembali ke halaman utama
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Breadcrumb */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
              Beranda
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-3 h-3 mx-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link href="/products" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                Produk
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-3 h-3 mx-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{produk.nama}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Detail Produk */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Gambar Produk */}
          <div className="md:w-1/2">
            <div className="relative h-96 w-full">
              <Image
                src={produk.gambar}
                alt={produk.nama}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Info Produk */}
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{produk.nama}</h1>
            <p className="text-gray-600 mb-6">{produk.deskripsi}</p>

            {/* Harga */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-blue-600">{produk.harga}</span>
              {produk.hargaDiskon && (
                <span className="ml-2 text-lg text-gray-500 line-through">{produk.hargaDiskon}</span>
              )}
              <div className="mt-1 text-sm text-green-600">
                Hemat hingga 30% untuk pembayaran tahunan
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex space-x-4 mb-8">
              <button className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 shadow-md">
                Pesan Sekarang
              </button>
              <button className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300">
                Chat Admin
              </button>
            </div>

            {/* Spesifikasi Teknis */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Spesifikasi Teknis:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Processor</p>
                  <p className="font-medium">{produk.spesifikasi.processor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Memory</p>
                  <p className="font-medium">{produk.spesifikasi.memory}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Database</p>
                  <p className="font-medium">{produk.spesifikasi.database}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Addon Domain</p>
                  <p className="font-medium">{produk.spesifikasi.addonDomain}</p>
                </div>
              </div>
            </div>

            {/* Dukungan */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">Dukungan {produk.spesifikasi.dukungan}</h4>
                  <p className="text-sm text-gray-600">Tim kami siap membantu 24/7 melalui live chat, email, dan telepon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fitur Produk */}
        <div className="p-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Fitur Utama</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {produk.fitur.map((fitur, index) => (
              <div key={index} className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">{fitur}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Produk Lainnya */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Produk Lainnya</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {produkHosting
            .filter(p => p.id !== Number(id))
            .map(produk => (
              <Link key={produk.id} href={`/products/${produk.id}`} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <div className="relative h-48 w-full">
                    <Image
                      src={produk.gambar}
                      alt={produk.nama}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{produk.nama}</h4>
                    <p className="text-gray-600 mb-4 line-clamp-2">{produk.deskripsi}</p>
                    <div className="text-blue-600 font-medium">Mulai {produk.harga}</div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}