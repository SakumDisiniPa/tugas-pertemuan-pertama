// src/app/product/[id]/page.jsx
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function ProductPage({ params }) {
  const { id } = params

  // Format harga untuk tampilan
  const formatHarga = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  // Ambil data produk dari database
  const produk = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      specifications: true
    }
  })

  // Ambil produk lainnya untuk rekomendasi
  const otherProducts = await prisma.product.findMany({
    where: {
      NOT: { id: parseInt(id) }
    },
    take: 3
  })

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
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{produk.name}</span>
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
                src={produk.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'}
                alt={produk.name}
                fill
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Info Produk */}
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{produk.name}</h1>
            <p className="text-gray-600 mb-6">{produk.description}</p>

            {/* Harga */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-blue-600">
                {formatHarga(produk.price)}/bln
              </span>
              {produk.discountPrice && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  {formatHarga(produk.discountPrice)}
                </span>
              )}
              <div className="mt-1 text-sm text-green-600">
                Hemat hingga 30% untuk pembayaran tahunan
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex space-x-4 mb-8">
              <Link
                href={`/order/${produk.id}`}
                className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 shadow-md text-center"
              >
                Pesan Sekarang
              </Link>
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
                  <p className="font-medium">{produk.specifications?.processor || '2 Core'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Memory</p>
                  <p className="font-medium">{produk.specifications?.memory || '2 GB'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Database</p>
                  <p className="font-medium">{produk.specifications?.database || 'Unlimited MySQL'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Addon Domain</p>
                  <p className="font-medium">{produk.specifications?.addonDomain || '5 Domain'}</p>
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
                  <h4 className="font-semibold text-gray-900">
                    Dukungan {produk.specifications?.support || '24/7 Priority Support'}
                  </h4>
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
            {produk.features.map((fitur, index) => (
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
          {otherProducts.map(produk => (
            <Link key={produk.id} href={`/products/${produk.id}`} className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <div className="relative h-48 w-full">
                  <Image
                    src={produk.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'}
                    alt={produk.name}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{produk.name}</h4>
                  <p className="text-gray-600 mb-4 line-clamp-2">{produk.description}</p>
                  <div className="text-blue-600 font-medium">
                    Mulai {formatHarga(produk.price)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}