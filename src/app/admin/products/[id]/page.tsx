// src/app/admin/products/[id]/page.tsx
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditProductForm from './EditProductForm';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Edit Paket Hosting</h1>
        <p className="text-gray-600 mt-1">Perbarui detail paket hosting Anda</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <EditProductForm product={product} />
      </div>
    </div>
  );
}