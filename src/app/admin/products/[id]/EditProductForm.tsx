// src/app/admin/products/[id]/EditProductForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@prisma/client';

type Props = {
  product: Product;
};

export default function EditProductForm({ product }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(product.imageUrl || '');
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price.toString(),
    discountPercentage: product.discountPrice 
      ? calculateDiscountPercentage(product.price, product.discountPrice).toString()
      : '',
    category: product.category,
    imageUrl: product.imageUrl || '',
    features: product.features.join('\n'),
    isPopular: product.isPopular || false
  });
  const [calculatedDiscountPrice, setCalculatedDiscountPrice] = useState(
    product.discountPrice ? product.discountPrice.toString() : ''
  );

  // Fungsi untuk menghitung persentase diskon
  function calculateDiscountPercentage(originalPrice: number, discountedPrice: number): number {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  }

  // Hitung harga diskon otomatis
  useEffect(() => {
    if (formData.price && formData.discountPercentage) {
      const price = parseFloat(formData.price);
      const discountPercentage = parseFloat(formData.discountPercentage);
      
      if (!isNaN(price) && !isNaN(discountPercentage)) {
        const discountAmount = price * (discountPercentage / 100);
        const discountedPrice = price - discountAmount;
        setCalculatedDiscountPrice(discountedPrice.toFixed(0));
      }
    } else {
      setCalculatedDiscountPrice('');
    }
  }, [formData.price, formData.discountPercentage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          discountPrice: calculatedDiscountPrice ? parseFloat(calculatedDiscountPrice) : null,
          features: formData.features.split('\n').filter(f => f.trim() !== ''),
          isPopular: formData.isPopular
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal memperbarui produk');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fungsi format Rupiah
  const formatRupiah = (value: string) => {
    const number = parseFloat(value) || 0;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Paket Hosting</h1>
          <p className="text-gray-600 mt-1">Perbarui detail paket hosting Anda</p>
        </div>
        <button
          onClick={() => router.push('/admin/products')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
        >
          Kembali
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

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
              onChange={handleChange}
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
              onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPopular" className="ml-2 block text-sm text-gray-700">
                Tandai sebagai produk populer
              </label>
            </div>
          </div>

          {/* Fitur Produk */}
          <div>
            <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-1">
              Fitur Produk (satu fitur per baris)
            </label>
            <textarea
              id="features"
              name="features"
              rows={5}
              value={formData.features}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Pisahkan setiap fitur dengan baris baru
            </p>
          </div>

          {/* Tombol Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </>
              ) : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}