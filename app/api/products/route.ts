import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    include: { brand: true },
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const product = await prisma.product.create({
    data: {
      title: body.title,
      price: body.price,
      brandId: body.brandId,
    },
  });
  return NextResponse.json(product, { status: 201 });
}
