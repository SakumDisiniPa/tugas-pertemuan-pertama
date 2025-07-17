// src/app/admin/products/new/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function AddProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPercentage: '',
    category: 'Shared Hosting',
    features: [''],
    imageUrl: '',
    isPopular: false
  })
  const [calculatedDiscountPrice, setCalculatedDiscountPrice] = useState<string>('')

  // Hitung harga diskon otomatis
  useEffect(() => {
    const price = parseFloat(formData.price)
    const discountPercentage = parseFloat(formData.discountPercentage)
    
    if (!isNaN(price) && !isNaN(discountPercentage)) {
      const discountAmount = price * (discountPercentage / 100)
      const discountedPrice = price - discountAmount
      setCalculatedDiscountPrice(discountedPrice.toFixed(0))
    } else {
      setCalculatedDiscountPrice('')
    }
  }, [formData.price, formData.discountPercentage])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData(prev => ({ ...prev, features: newFeatures }))
  }

  const addFeatureField = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }))
  }

  const removeFeatureField = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, features: newFeatures }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('price', formData.price)
      formDataToSend.append('discountPercentage', formData.discountPercentage)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('isPopular', formData.isPopular.toString())
      formData.features.forEach(feature => {
        formDataToSend.append('features', feature)
      })
      
      // Jika ada file gambar, tambahkan ke FormData
      if (previewImage && formData.imageUrl) {
        const blob = await fetch(formData.imageUrl).then(r => r.blob())
        formDataToSend.append('image', blob, 'product-image.jpg')
      }

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        body: formDataToSend // Tidak perlu headers Content-Type untuk FormData
      })

      if (!response.ok) {
        throw new Error('Gagal menambahkan produk')
      }

      toast.success('Produk berhasil ditambahkan!')
      router.push('/admin/products')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Terjadi kesalahan')
    } finally {
      setIsLoading(false)
    }
  }

  // Fungsi format Rupiah
  const formatRupiah = (value: string) => {
    const number = parseFloat(value) || 0
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number)
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tambah Produk Hosting Baru</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
        >
          Kembali
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Produk</label>
            <div className="flex items-center space-x-6">
              <div className="shrink-0">
                {previewImage ? (
                  <img
                    className="h-32 w-32 object-cover rounded-lg"
                    src={previewImage}
                    alt="Preview"
                  />
                ) : (
                  <div className="h-32 w-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <label className="block">
                <span className="sr-only">Pilih gambar</span>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </label>
            </div>
          </div>

          {/* Nama Produk */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Produk
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contoh: Hosting Bisnis Premium"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi Produk
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Jelaskan fitur utama dan keunggulan produk"
            />
          </div>

          {/* Harga dan Diskon */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Harga Normal */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Harga Normal
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">Rp</span>
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                  min="0"
                />
              </div>
              {formData.price && (
                <p className="mt-1 text-sm text-gray-500">
                  {formatRupiah(formData.price)}/bulan
                </p>
              )}
            </div>

            {/* Persentase Diskon */}
            <div>
              <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700 mb-1">
                Diskon (%)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
                <input
                  type="number"
                  id="discountPercentage"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleInputChange}
                  className="block w-full pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            {/* Harga Setelah Diskon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga Setelah Diskon
              </label>
              <div className="p-2 border border-gray-300 rounded-md bg-gray-50">
                {calculatedDiscountPrice ? (
                  <div>
                    <p className="font-medium text-green-600">
                      {formatRupiah(calculatedDiscountPrice)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Hemat {formatRupiah((parseFloat(formData.price) - parseFloat(calculatedDiscountPrice)).toString())}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">Masukkan harga dan diskon</p>
                )}
              </div>
            </div>
          </div>

          {/* Kategori dan Popular */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Kategori
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Shared Hosting">Shared Hosting</option>
                <option value="VPS">VPS</option>
                <option value="Cloud Hosting">Cloud Hosting</option>
                <option value="WordPress Hosting">WordPress Hosting</option>
                <option value="Dedicated Server">Dedicated Server</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                id="isPopular"
                name="isPopular"
                type="checkbox"
                checked={formData.isPopular}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPopular" className="ml-2 block text-sm text-gray-700">
                Tandai sebagai produk populer
              </label>
            </div>
          </div>

          {/* Fitur Produk */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fitur Produk</label>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    required={index === 0}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Fitur ${index + 1}`}
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeatureField(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeatureField}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah Fitur
              </button>
            </div>
          </div>

          {/* Tombol Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </>
              ) : 'Simpan Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}