'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
  productId: number
}

export default function DeleteButton({ productId }: DeleteButtonProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    const confirmed = confirm('Yakin ingin menghapus produk ini?')

    if (!confirmed) return

    const res = await fetch(`/api/admin/products/${productId}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      startTransition(() => {
        router.refresh()
      })
    } else {
      alert('Gagal menghapus produk.')
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
    >
      {isPending ? 'Menghapus...' : 'Hapus'}
    </button>
  )
}
