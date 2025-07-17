import prisma from '@/lib/prisma'

export default async function Home() {
  const produkHosting = await prisma.product.findMany()

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Produk Hosting</h1>
      <div>
        {produkHosting.map((produk) => (
          <div key={produk.id} className="border p-4 mb-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{produk.name}</h2>
            <p className="text-gray-600">{produk.description}</p>
            <p className="font-bold text-green-600">Rp {produk.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
