import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";  // Import Prisma client dari file lib
import type { Product } from "@prisma/client";

export const POST = async (request: Request) => {
  try {
    const body: Product = await request.json();
    const product = await prisma.product.create({
      data: {
        title: body.title,
        price: Number(body.price),  // Ensure price is a number
        brandId: Number(body.brandId), // Ensure brandId is a number
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Product creation failed" }, { status: 500 });
  }
};
