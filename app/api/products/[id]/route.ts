import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Handler untuk DELETE request
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id; // Pastikan id diambil dari params
  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    // Gunakan NextResponse tanpa .json() untuk status 204
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

// Handler untuk PATCH request
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    const data = await request.json();
    const { title, price, brandId } = data;

    if (!title || !price || !brandId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        title,
        price,
        brandId: Number(brandId),
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
