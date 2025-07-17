// src/app/admin/products/page.tsx
import prisma from '@/lib/prisma';
import Link from 'next/link';
import DeleteButton from './DeleteButton';

export default async function AdminProducts() {
  const products = await prisma.product.findMany();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Hosting Plans</h1>
        <Link href="/admin/products/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add New Plan
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border">{product.name}</td>
                <td className="py-2 px-4 border">${product.price}</td>
                <td className="py-2 px-4 border">{product.category}</td>
                <td className="py-2 px-4 border">
                  <Link 
                    href={`/admin/products/${product.id}`}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Edit
                  </Link>
                  <DeleteButton productId={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}