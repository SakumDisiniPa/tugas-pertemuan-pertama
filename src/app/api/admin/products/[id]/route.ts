// src/app/api/admin/products/[id]/route.ts
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(request: Request, context: { params: { id: string } }) {
  const { id } = context.params

  try {
    const body = await request.json()
    const { name, description, price, features, category, imageUrl } = body

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price,
        features,
        category,
        imageUrl,
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('[PUT PRODUCT ERROR]', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}
