import { NextResponse } from "next/server";
import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

// Handler for DELETE method
export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const product = await prisma.product.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Product deletion failed" }, { status: 500 });
  }
};

// Optional: Handle other HTTP methods (e.g., GET, POST)
export function GET() {
  return NextResponse.json({ message: "Only DELETE method is allowed" }, { status: 405 });
}


export const PATCH = async(request: Request, { params }: { params: { id: string } }) => {
  const body: Product = await request.json();
  const product = await prisma.product.update({
    where: { id: Number(params.id) },
    data:{
      title: body.title,
      price: body.price,
      brandId: body.brandId
    } 
    });
    return NextResponse.json(product,{ status:200 });

}