// src/app/products/page.jsx
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

export default async function ProductsPage() {
  // Ambil data produk dari database menggunakan Prisma
  const produkHosting = await prisma.product.findMany({
    orderBy: { price: 'asc' },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      features: true,
      category: true,
      imageUrl: true,
      isPopular: true,
      discountPrice: true
    }
  })

  // Format harga untuk tampilan
  const formatHarga = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

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
              produk.isPopular ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
            }`}
          >
            {produk.isPopular && (
              <div className="bg-blue-600 text-white text-center py-1 text-sm font-bold">
                POPULER
              </div>
            )}
            <div className="relative h-48 w-full">
              <Image
                src={produk.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'}
                alt={produk.name}
                fill
                className="w-full h-full object-cover"
                priority={produk.isPopular}
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{produk.name}</h3>
                {produk.isPopular && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">{produk.description}</p>
              
              <div className="mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  {formatHarga(produk.price)}/bln
                </span>
                {produk.discountPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {formatHarga(produk.discountPrice)}
                  </span>
                )}
              </div>
              
              <ul className="space-y-2 mb-6">
                {produk.features.slice(0, 4).map((fitur, index) => (
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
                  href={`/order/${produk.id}`}
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
        <Link 
          href="/custom-hosting" 
          className="inline-flex px-6 py-3 bg-white border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 hover:bg-gray-50"
        >
          Konsultasi Gratis
        </Link>
      </div>
    </div>
  )
}