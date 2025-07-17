import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request) {
  try {
    const formData = await request.formData()

    // Proses upload gambar
    const imageFile = formData.get('image')
    let imageUrl = null

    if (imageFile && imageFile.name) {
      const uploadDir = path.join(process.cwd(), 'public/uploads')
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      const fileName = `product-${Date.now()}${path.extname(imageFile.name)}`
      const filePath = path.join(uploadDir, fileName)

      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      fs.writeFileSync(filePath, buffer)

      imageUrl = `/uploads/${fileName}`
    }

    // Ambil semua fitur dari form data
    const features = []
    for (const [key, value] of formData.entries()) {
      if (key === 'features') {
        features.push(value)
      }
    }

    // Simpan ke database
    const product = await prisma.product.create({
      data: {
        name: formData.get('name'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        category: formData.get('category'),
        features: features,
        imageUrl: imageUrl
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product', message: error.message },
      { status: 500 }
    )
  }
}
