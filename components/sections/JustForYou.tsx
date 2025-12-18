"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/sections/ProductCard";
import React from "react";
import { Category, Product } from "@/app/generated/prisma/client";

interface JustForYouProps {
  products: Product[];
  categories: Category[];
}

export default function JustForYou({ products, categories }: JustForYouProps) {
  const [activeCategory, setActiveCategory] = useState("BASEBALL CAPS");

  return (
    <section className="w-full max-w-[1737px] mx-auto px-4 sm:px-6 lg:px-4">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">
          Just For You
        </h2>

        <nav className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 sm:gap-x-5 text-xs sm:text-sm tracking-widest text-gray-500">
          {categories.length > 0 && categories.map((category: Category, index: number) => (
            <React.Fragment key={category.id}>
              <button
                onClick={() => setActiveCategory(category.name)}
                className={`
            transition-colors duration-200 
            ${activeCategory === category.name
                    ? "text-gray-900 font-semibold"
                    : "hover:text-gray-900"
                  }
          `}
              >
                {category.name}
              </button>

              {/* Add "/" except after last item */}
              {index < categories.length - 1 && (
                <span className="text-gray-300">/</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.length > 0 && products.map((product: Product) => (
          <ProductCard key={product.id} product={product} variant="best-ShopOne" />
        ))}
      </div>

      {/* See All Button */}
      <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 flex items-center justify-center">
        <Link
          href="#"
          className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white text-sm sm:text-base font-semibold px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 shadow-md hover:shadow-lg transition-all duration-200 uppercase tracking-wide"
        >
          SEE ALL PRODUCT
        </Link>
      </div>
    </section>
  );
}
