// src/app/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import prisma from '@/lib/prisma'

const produk = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

export default async function Home() {
  // Ambil data produk dari database
  const produkHosting = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 6 // Ambil 6 produk terbaru
  })

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-xl mt-6 mx-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Selamat Datang di <span className="text-yellow-300">Sakum Hosting</span>
        </h1>
        <p className="mt-6 text-xl max-w-3xl mx-auto">
          Penyedia hosting terbaik di Indonesia dengan layanan 24/7 dan teknologi terkini.
        </p>
        <div className="mt-10 flex justify-center space-x-4">
          <Link href="/daftar" className="px-8 py-4 text-lg font-medium rounded-lg text-blue-700 bg-yellow-400 hover:bg-yellow-300 transition duration-300 shadow-lg transform hover:scale-105">
            Daftar Sekarang
          </Link>
          <Link href="/products" className="px-8 py-4 text-lg font-medium rounded-lg border-2 border-white text-white hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Lihat Paket
          </Link>
        </div>
      </div>
      
      {/* Keunggulan */}
      <div className="mt-20 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Mengapa Memilih Kami?</h2>
        <p className="text-xl text-center text-gray-600 max-w-4xl mx-auto mb-12">
          Layanan hosting terbaik dengan dukungan teknis 24/7 dan infrastruktur berkelas dunia
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Uptime 99.9%",
              desc: "Jaminan server online dengan monitoring 24 jam",
              icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            },
            {
              title: "Support Cepat",
              desc: "Tim support siap membantu kapan saja",
              icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
            },
            {
              title: "Harga Terjangkau",
              desc: "Kualitas premium dengan harga kompetitif",
              icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Produk Hosting */}
      <div className="mt-20 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Paket Hosting Kami</h2>
        <p className="text-xl text-center text-gray-600 max-w-4xl mx-auto mb-12">
          Pilih paket hosting yang sesuai dengan kebutuhan Anda
        </p>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {produkHosting.map((produk) => (
            <div key={produk.id} className="bg-white rounded-xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-gray-100">
              <div className="relative h-56 w-full">
                {produk.imageUrl ? (
                  <Image 
                    src={produk.imageUrl}
                    alt={produk.name}
                    fill
                    className="object-cover"
                    priority={produk.id <= 3}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                {produk.isPopular && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    POPULER
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{produk.name}</h3>
                <p className="text-gray-600 mb-4">{produk.description}</p>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    Rp {produk.price.toLocaleString()}/bln
                  </span>
                  {produk.discountPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                     Rp {produk.price.toLocaleString()}
                    </span>
                  )}
                </div>
                <ul className="space-y-2 mb-6">
                  {produk.features.slice(0, 5).map((fitur, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{fitur}</span>
                    </li>
                  ))}
                  {produk.features.length > 5 && (
                    <li className="text-sm text-gray-500">
                      +{produk.features.length - 5} fitur lainnya
                    </li>
                  )}
                </ul>
                <Link 
                  href={`/products/${produk.id}`}
                  className="block w-full py-3 px-4 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                >
                  Pesan Sekarang
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimoni */}
      <div className="mt-20 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Apa Kata Pelanggan Kami?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Budi Santoso",
              company: "TokoOnline.com",
              quote: "Sakum Hosting sangat stabil untuk toko online saya, tidak pernah down saat traffic tinggi.",
              avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
            },
            {
              name: "Ani Wijaya",
              company: "BlogPendidikan.id",
              quote: "Support yang sangat responsif, masalah teknis selalu cepat ditangani.",
              avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80"
            },
            {
              name: "Cahyo Pratama",
              company: "DevStudio",
              quote: "Fitur untuk developer sangat lengkap, membuat pekerjaan saya lebih efisien.",
              avatar: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
            }
          ].map((testi, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image 
                    src={testi.avatar}
                    alt={testi.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testi.name}</h4>
                  <p className="text-sm text-gray-600">{testi.company}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testi.quote}"</p>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Banner Promo */}
      <div className="mt-20 mx-4">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow-xl p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Diskon Spesial 40%!</h3>
          <p className="text-lg text-gray-800 mb-6">
            Dapatkan diskon 40% untuk pembayaran tahun pertama dengan kode <span className="font-bold bg-gray-800 text-yellow-300 px-2 py-1 rounded">SAKUM40</span>
          </p>
          <Link 
            href="/promo"
            className="inline-block px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition duration-300 shadow-lg transform hover:scale-105"
          >
            Klaim Sekarang
          </Link>
        </div>
      </div>
    </div>
  )
}