// src/app/products/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import prisma from '@/lib/prisma'

export default async function ProductsPage() {
  // Ambil semua data produk dari database
  const products = await prisma.product.findMany({
    orderBy: { 
      price: 'asc' 
    },
    include: {
      orders: true // Include relasi orders untuk info popularitas
    }
  })

  // Format harga ke Rupiah
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  // Hitung jumlah kategori unik untuk filter
  const uniqueCategories = [...new Set(products.map(product => product.category))]

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
        <button 
          className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
        >
          Semua Produk
        </button>
        
        {uniqueCategories.map((category, index) => (
          <button 
            key={index}
            className="px-6 py-2 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Daftar Produk */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          // Hitung jumlah pemesanan untuk produk ini
          const orderCount = product.orders.length
          // Tentukan apakah produk populer (lebih dari 5 pemesanan)
          const isPopular = orderCount > 5 || product.isPopular

          return (
            <div 
              key={product.id} 
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                isPopular ? 'border-2 border-blue-500' : 'border border-gray-200'
              }`}
            >
              {isPopular && (
                <div className="bg-blue-600 text-white text-center py-1 text-sm font-bold">
                  {orderCount > 10 ? 'BEST SELLER' : 'POPULER'}
                </div>
              )}

              {/* Gambar Produk */}
              <div className="relative h-48 w-full">
                <Image
                  src={product.imageUrl || '/default-hosting.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Detail Produk */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {product.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                
                {/* Harga */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {formatRupiah(product.price)}/bln
                  </span>
                  {product.discountPrice && (
                    <>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        {formatRupiah(product.discountPrice)}
                      </span>
                      <span className="ml-2 text-sm font-medium text-green-600">
                        {Math.round((1 - product.price/product.discountPrice)*100)}% OFF
                      </span>
                    </>
                  )}
                </div>
                
                {/* Fitur */}
                <ul className="space-y-2 mb-6">
                  {product.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {product.features.length > 4 && (
                    <li className="text-sm text-gray-500">
                      +{product.features.length - 4} fitur lainnya...
                    </li>
                  )}
                </ul>
                
                {/* Tombol Aksi */}
                <div className="flex space-x-3">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                  >
                    Detail
                  </Link>
                  <Link
                    href={`/order/${product.id}`}
                    className="flex-1 text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 transition"
                  >
                    Pesan Sekarang
                  </Link>
                </div>

                {/* Info Popularitas */}
                {orderCount > 0 && (
                  <div className="mt-4 text-xs text-gray-500">
                    {orderCount} pelanggan telah memilih paket ini
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Info Tambahan */}
      <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Butuh Hosting Khusus?</h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Kami menyediakan solusi hosting khusus untuk kebutuhan spesifik dengan resource dedicated dan konfigurasi khusus.
        </p>
        <Link 
          href="/custom-hosting" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          Konsultasi Gratis
          <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  )
}