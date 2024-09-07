"use client";
import { SyntheticEvent, useState } from "react";
import type { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
};

const UpdateProduct = ({ brands, product }: { brands: Brand[]; product: Product }) => {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price.toString()); // Initialize with string
  const [brand, setBrand] = useState(product.brandId);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();

    const parsedPrice = parseFloat(price);
    const parsedBrand = Number(brand);

    // Validasi input
    if (!title || isNaN(parsedPrice) || parsedPrice <= 0 || isNaN(parsedBrand) || parsedBrand <= 0) {
      console.error("Invalid input");
      return;
    }

    try {
      await axios.patch(`/api/products/${product.id}`, {
        title,
        price: parsedPrice,
        brandId: parsedBrand,
      });
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>Edit</button>

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update {product.title}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered" 
                placeholder="Product Name"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Product Price</label>
              <input 
                type="text"   
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input input-bordered" 
                placeholder="Product Price"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Brand</label>
              <select 
                value={brand}
                onChange={(e) => setBrand(Number(e.target.value))} 
                className="select select-bordered"
              >
                {brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>Close</button>
              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
