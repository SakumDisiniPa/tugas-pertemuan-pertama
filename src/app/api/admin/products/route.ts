// src/app/api/admin/products/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  const form = await request.formData()

  const name = form.get('name') as string
  const description = form.get('description') as string
  const price = parseFloat(form.get('price') as string)
  const discountPercentage = parseFloat(form.get('discountPercentage') as string)
  const category = form.get('category') as string
  const isPopular = form.get('isPopular') === 'true'
  const features = form.getAll('features') as string[]

  const imageFile = form.get('image') as File | null
  let imageBuffer = null

  if (imageFile && typeof imageFile !== 'string') {
    imageBuffer = Buffer.from(await imageFile.arrayBuffer())
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        discountPercentage,
        category,
        isPopular,
        features: {
          createMany: {
            data: features.map(f => ({ name: f }))
          }
        },
        images: imageBuffer ? {
          create: {
            url: 'data:image/jpeg;base64,' + imageBuffer.toString('base64')
          }
        } : undefined
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('[CREATE PRODUCT ERROR]', error)
    return NextResponse.json({ error: 'Gagal membuat produk' }, { status: 500 })
  }
}
