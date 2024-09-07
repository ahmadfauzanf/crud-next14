import { PrismaClient } from "@prisma/client";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteproduct";
import UpdateProduct from "./updateProduct";
import React from 'react';

const prisma = new PrismaClient();

const getProducts = async () => {
  try {
    const res = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        brandId: true,
        brand: true,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const GetBrands = async () => {
  try {
    const res = await prisma.brand.findMany();
    return res;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

const Product = async () => {
  const [products, brands] = await Promise.all([getProducts(), GetBrands()]);

  return (
    <div>
      <div className="mb-2">
        <AddProduct brands={brands} />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.brand.name}</td>
              <td className="flex justify-center space-x-1">
                <UpdateProduct brands={brands} product={product} />
                <DeleteProduct product={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
