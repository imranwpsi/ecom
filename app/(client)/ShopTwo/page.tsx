import Breadcrumb from "@shared/Breadcrumb";
import ShopCategory from "@shared/ShopCategory";
import ShopFilter from "@shared/ShopFilter";
import ProductCard from "@/components/sections/ProductCard";
import { Product } from "@/types/product";
const products: Product[] = [
    {
      id: 1,
      name: "Classic Baseball Cap",
      price: 3500,
      originalPrice: 5000,
      discount: 30,
      image: "/assets/image/just-for-you/Rectangle 19333.png",
      category: "Best Sellers",
    },
    {
      id: 2,
      name: "Vintage Trucker Hat",
      price: 4000,
      originalPrice: 5500,
      discount: 27,
      image: "/assets/image/just-for-you/Rectangle 19333 (1).png",
      category: "New Arrivals",
    },
    {
      id: 3,
      name: "Premium Snapback",
      price: 4500,
      originalPrice: 6000,
      discount: 25,
      image: "/assets/image/just-for-you/Rectangle 19333 (2).png",
      category: "Featured",
    },
    {
      id: 4,
      name: "Urban Street Cap",
      price: 3800,
      originalPrice: 5200,
      discount: 27,
      image: "/assets/image/just-for-you/Rectangle 19333 (1).png",
      category: "Best Sellers",
    },
    {
      id: 5,
      name: "Sport Performance Cap",
      price: 4200,
      originalPrice: 5800,
      discount: 28,
      image: "/assets/image/just-for-you/Rectangle 19333 (1).png",
      category: "New Arrivals",
    },
    {
      id: 6,
      name: "Retro Dad Hat",
      price: 3600,
      originalPrice: 4800,
      discount: 25,
      image: "/assets/image/just-for-you/Rectangle 19333 (2).png",
      category: "Featured",
    },
    {
      id: 7,
      name: "Designer Bucket Hat",
      price: 5000,
      originalPrice: 7000,
      discount: 29,
      image: "/assets/image/just-for-you/Rectangle 19333 (1).png",
      category: "Best Sellers",
    },
    {
      id: 8,
      name: "Classic Beanie",
      price: 2500,
      originalPrice: 3500,
      discount: 29,
      image: "/assets/image/just-for-you/Rectangle 19333 (2).png",
      category: "New Arrivals",
    },
    {
      id: 9,
      name: "Classic Baseball Cap",
      price: 3500,
      originalPrice: 5000,
      discount: 30,
      image: "/assets/image/just-for-you/Rectangle 19333.png",
      category: "Best Sellers",
    },
    {
      id: 10,
      name: "Vintage Trucker Hat",
      price: 4000,
      originalPrice: 5500,
      discount: 27,
      image: "/assets/image/just-for-you/Rectangle 19333 (1).png",
      category: "New Arrivals",
    },
    {
      id: 11,
      name: "Premium Snapback",
      price: 4500,
      originalPrice: 6000,
      discount: 25,
      image: "/assets/image/just-for-you/Rectangle 19333 (2).png",
      category: "Featured",
    },
    {
      id: 12,
      name: "Urban Street Cap",
      price: 3800,
      originalPrice: 5200,
      discount: 27,
      image: "/assets/image/just-for-you/Rectangle 19333 (1).png",
      category: "Best Sellers",
    },
  ];

export default function ShopTwo() {
  return (
    <>
      <main>
        <Breadcrumb
            title="Men's Caps & Hats"
            itemsCount={120}
            path={["Home", "Men's Caps & Hats"]}
        />
        <ShopCategory />
        <ShopFilter />
        <section className="products-wrapper mt-15">
            <div className="container mx-auto">
                {/* Products Grid/List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                   <div className="grid grid-cols-1">
                       {products.slice(0, 1).map((product) => (
                          <ProductCard key={product.id} product={product} />
                      ))}
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-10">
                      {products.slice(0, 4).map((product) => (
                          <ProductCard key={product.id} product={product} />
                      ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-8 sm:my-10 lg:my-14">
                    {products.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                   <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-10">
                      {products.slice(1, 5).map((product) => (
                          <ProductCard key={product.id} product={product} />
                      ))}
                   </div>
                   <div className="grid grid-cols-1">
                       {products.slice(1, 2).map((product) => (
                          <ProductCard key={product.id} product={product} />
                      ))}
                   </div>
                </div>
            </div>
        </section>
      </main>
    </>
  );
}
