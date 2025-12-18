"use client";

import Image from "next/image";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { GrPrevious, GrNext } from "react-icons/gr";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function RelatedProduct() {
  const products = [
    {
      id: 1,
      name: "Sport Performance Cap",
      price: 4200,
      originalPrice: 5800,
      discount: 28,
      image: "/assets/image/product/cap-1.jpg",
      category: "New Arrivals",
    },
    {
      id: 2,
      name: "Retro Dad Hat",
      price: 3600,
      originalPrice: 4800,
      discount: 25,
      image: "/assets/image/product/cap-2.jpg",
      category: "Featured",
    },
    {
      id: 3,
      name: "Designer Bucket Hat",
      price: 5000,
      originalPrice: 7000,
      discount: 29,
      image: "/assets/image/product/cap-4.jpg",
      category: "Best Sellers",
    },
    {
      id: 4,
      name: "Classic Beanie",
      price: 2500,
      originalPrice: 3500,
      discount: 29,
      image: "/assets/image/product/cap-6.jpg",
      category: "New Arrivals",
    },
    {
      id: 5,
      name: "Sport Performance Cap",
      price: 4200,
      originalPrice: 5800,
      discount: 28,
      image: "/assets/image/product/cap-1.jpg",
      category: "New Arrivals",
    },
    {
      id: 6,
      name: "Retro Dad Hat",
      price: 3600,
      originalPrice: 4800,
      discount: 25,
      image: "/assets/image/product/cap-2.jpg",
      category: "Featured",
    },
    {
      id: 7,
      name: "Designer Bucket Hat",
      price: 5000,
      originalPrice: 7000,
      discount: 29,
      image: "/assets/image/product/cap-4.jpg",
      category: "Best Sellers",
    },
    {
      id: 8,
      name: "Classic Beanie",
      price: 2500,
      originalPrice: 3500,
      discount: 29,
      image: "/assets/image/product/cap-6.jpg",
      category: "New Arrivals",
    },
  ];

  return (
    <section className="RelatedProduct-wrappervpx-4 sm:px-6 lg:px-4 py-10">
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-5xl text-center font-bold mb-10">
        You May Also Like
        </h1>
        <div className="relative">

          {/* Navigation Buttons */}
          <button className="swiper-button-prev-related hidden lg:flex absolute -left-6 top-[40%] -translate-y-1/2 bg-white p-3 shadow-xl border border-gray-100 z-10">
            <GrPrevious size={24}/>
          </button>

          <button className="swiper-button-next-related hidden lg:flex absolute -right-6 top-[40%] -translate-y-1/2 bg-white p-3 shadow-xl border border-gray-100 z-10">
            <GrNext size={24} />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next-related",
              prevEl: ".swiper-button-prev-related",
            }}
            spaceBetween={0}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-10"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="group pb-4 sm:pb-6 lg:pb-10">
                  <div className="relative overflow-hidden">

                    {/* Badge */}
                    {product.category && (
                      <span className="absolute top-3 left-3 bg-black/80 text-white text-xs font-semibold px-3 py-1.5 tracking-wider z-10">
                        {product.category}
                      </span>
                    )}

                    {/* Product Image */}
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-100 object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link
                        href="#"
                        className="bg-white text-black px-5 py-2.5 sm:px-6 sm:py-3 flex items-center space-x-2 hover:bg-gray-100 transition-colors text-sm sm:text-base font-semibold shadow-lg"
                      >
                        <IoCartOutline />
                        <span>ADD TO CART</span>
                      </Link>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mt-4">
                    <h3 className="text-sm font-bold text-gray-900">{product.name}</h3>

                    <div className="flex flex-wrap items-baseline space-x-2 mt-1">
                      <p className="text-base font-bold text-gray-900">
                        ৳{product.price}
                      </p>

                      {product.originalPrice && (
                        <>
                          <p className="text-sm text-gray-500 line-through">
                            ৳{product.originalPrice}
                          </p>

                          {product.discount && (
                            <span className="flex items-center gap-1 bg-gray-800 text-white text-xs font-bold px-2 py-1">
                              <BiSolidOffer />
                              {product.discount}% OFF
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
