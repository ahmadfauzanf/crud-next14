import AddProduct from "@/app/components/addProduct";
import DeleteProduct from "@/app/components/deleteproduct";
import UpdateProduct from "@/app/components/updateProduct";
import { prisma } from "@/lib/prisma";

type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
  brand: { name: string };
};

type Brand = {
  id: number;
  name: string;
};

const getProducts = async () => {
  const products = await prisma.product.findMany({
    include: { brand: true },
  });
  return products;
};

const getBrands = async () => {
  const brands = await prisma.brand.findMany();
  return brands;
};

const ProductPage = async () => {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);

  return (
    <div>
      <AddProduct brands={brands} />
      <table className="table w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Actions</th>
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

export default ProductPage;
