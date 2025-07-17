// src/app/api/orders/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { productId, customerName, customerEmail, domain } = await request.json();
  
  try {
    const order = await prisma.order.create({
      data: {
        productId: parseInt(productId),
        customerName,
        customerEmail,
        domain,
      },
      include: {
        product: true,
      },
    });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}