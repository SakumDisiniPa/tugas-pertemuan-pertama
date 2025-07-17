// src/app/products/[id]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

// Format harga ke Rupiah
const formatRupiah = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  try {
    // Validasi ID produk
    const productId = parseInt(params.id)
    if (isNaN(productId)) {
      return notFound()
    }

    // Ambil data produk dari database
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        orders: {
          select: {
            id: true,
            customerName: true,
            createdAt: true
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        }
      }
    })

    // Jika produk tidak ditemukan
    if (!product) {
      return notFound()
    }

    // Ambil 4 produk rekomendasi dari kategori yang sama
    const recommendedProducts = await prisma.product.findMany({
      where: {
        category: product.category,
        NOT: { id: productId }
      },
      take: 4,
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
        description: true
      }
    })

    // Hitung jumlah order
    const orderCount = product.orders.length

    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                Beranda
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link href="/products" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                  Semua Produk
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link href={`/products?category=${product.category}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                  {product.category}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Product Detail Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-6">
              <div className="relative h-96 w-full rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.imageUrl || '/default-hosting.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {orderCount > 10 && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    BEST SELLER
                  </div>
                )}
              </div>
              
              {/* Order Info */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.8 ({orderCount} ulasan)</span>
                </div>
                <div>
                  {orderCount} pelanggan
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6 md:border-l border-gray-200">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Pricing Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-end mb-2">
                  <span className="text-3xl font-bold text-blue-600">
                    {formatRupiah(product.price)}
                    <span className="text-lg">/bulan</span>
                  </span>
                </div>
                
                <div className="text-sm text-gray-600">
                  <p className="mb-1">Gratis domain untuk pembayaran minimal 1 tahun</p>
                  <p>Hemat hingga 30% untuk pembayaran tahunan</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href={`/order/${product.id}`}
                  className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 shadow-md text-center flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Pesan Sekarang
                </Link>
                <button className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat Admin
                </button>
              </div>

              {/* Technical Specifications */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Spesifikasi Teknis</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Fitur {index + 1}</p>
                      <p className="font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders */}
              {orderCount > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Pelanggan Terbaru</h3>
                  <div className="space-y-2">
                    {product.orders.map(order => (
                      <div key={order.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{order.customerName}</span>
                        <span className="text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Support Info */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">24/7 Priority Support</h4>
                    <p className="text-sm text-gray-600">
                      Tim support kami siap membantu 24 jam melalui live chat, email, dan telepon. 
                      Waktu respon rata-rata kurang dari 15 menit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="p-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Fitur Lengkap</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{feature}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Produk Lainnya di {product.category}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map(product => (
                <Link key={product.id} href={`/products/${product.id}`} className="group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg h-full flex flex-col">
                    <div className="relative h-48 w-full">
                      <Image
                        src={product.imageUrl || '/default-hosting.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 flex-grow">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h4>
                      <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{product.description}</p>
                      <div className="mt-auto">
                        <div className="text-blue-600 font-medium">
                          Mulai {formatRupiah(product.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error loading product:', error)
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Terjadi kesalahan</h1>
        <p className="text-gray-600 mb-6">Gagal memuat detail produk. Silakan coba lagi nanti.</p>
        <Link href="/products" className="text-blue-600 hover:underline">
          Kembali ke halaman produk
        </Link>
      </div>
    )
  }
}