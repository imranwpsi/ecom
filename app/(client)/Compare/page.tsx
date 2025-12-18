"use client";

import Image from "next/image";
import { AiFillStar as Star } from "react-icons/ai";


// ======================
// TYPE
// ======================
export interface CompareProduct {
  id: number;
  title: string;
  price: number;
  oldPrice: number;
  stock: string;
  rating: number;
  fabric: string;
  colors: string[];
  weight: string;
  brand: string;
  image: string;
}

// ======================
// SAMPLE DATA
// ======================
export const sampleProducts: CompareProduct[] = [
  {
    id: 1,
    title: "Yankees Essential Black Cap",
    price: 150,
    oldPrice: 250,
    stock: "In Stock",
    rating: 4.8,
    fabric: "Cotton",
    colors: ["Red", "Green", "Blue"],
    weight: "-",
    brand: "Easy",
    image: "/assets/image/product/cap-2.jpg",
  },
  {
    id: 2,
    title: "Yankees Essential Black Cap",
    price: 150,
    oldPrice: 250,
    stock: "In Stock",
    rating: 4.8,
    fabric: "Cotton",
    colors: ["Red", "Green", "Blue"],
    weight: "-",
    brand: "Easy",
    image: "/assets/image/product/cap-3.jpg",
  },
];

// ======================
// COMPONENT
// ======================
export default function Compare() {
  return (
    <div className="bg-white text-gray-900 py-8 md:py-15">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

          {/* LEFT LABEL COLUMN */}
          <div className="border border-slate-200 bg-white">
            <div className="h-[415px] flex items-center pl-6 text-sm text-gray-500 p-10">
              Product
            </div>
            <div className="border-t border-slate-200">
              {["Price", "Availability", "Rating", "Fabric", "Color", "Weight", "Brand"].map((label) => (
                <div key={label} className="row-height border-b border-slate-200 flex items-center pl-6 text-sm text-gray-500">
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* PRODUCT CARDS */}
          {sampleProducts.map((product) => (
            <div key={product.id} className="border border-slate-200 bg-white">
              {/* Product Image */}
              <div className="produtcts-img p-10">
                <div className="h-[300px] flex items-center">
                  <Image
                    src={product.image}
                    width={300}
                    height={300}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-4 text-sm text-center font-semibold">{product.title}</h3>
              </div>

              {/* Product Rows */}
              <div className="border-t border-slate-200">
                {/* Price */}
                <div className="row-height border-b border-slate-200 flex gap-1 items-center pl-6 text-sm text-gray-500">
                  <span className="line-through text-gray-400">${product.oldPrice}</span>
                  <span className="text-[18px] font-bold">${product.price}</span>
                </div>

                {/* Stock */}
                <div className="row-height border-b border-slate-200 flex items-center pl-6 text-sm text-gray-500">{product.stock}</div>

                {/* Rating */}
                <div className="row-height border-b border-slate-200 flex items-center pl-6 text-sm text-gray-500 gap-1">
                  {[1,2].map((i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))} 
                    <span className="text-gray-600">({product.rating})</span>
                </div>

                {/* Fabric */}
                <div className="row-height border-b border-slate-200 flex items-center pl-6 text-sm text-gray-500">{product.fabric}</div>

                {/* Colors */}
                <div className="row-height border-b border-slate-200 flex items-center pl-6 text-sm text-gray-500">
                  {product.colors.join(", ")}
                </div>

                {/* Weight */}
                <div className="row-height border-b border-slate-200 flex items-center pl-6 text-sm text-gray-500">{product.weight}</div>

                {/* Brand */}
                <div className="row-height border-b border-slate-200 flex items-center pl-6 text-sm text-gray-500">{product.brand}</div>

                {/* Add to Cart */}
                <div className="row-height flex items-center">
                  <button className="m-3 bg-[#0f172a] hover:bg-[#1e293b] text-white py-4 px-10 text-sm">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* EMPTY CARD */}
          <div className="border border-slate-200 bg-white">
            <div className="h-[415px] flex items-center justify-center">
              <div className="h-64 w-64 flex items-center justify-center text-gray-400 text-4xl shadow">+</div>
            </div>
            <div className="border-t border-slate-200">
              {Array(7).fill("").map((_, i) => (
                <div key={i} className="row-height border-b border-slate-200 flex items-center pl-6 text-sm text-gray-500"></div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
