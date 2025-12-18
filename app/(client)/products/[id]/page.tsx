import RelatedProduct from "@/components/shared/RelatedProduct";
import DetailsTitle from "@/components/shared/DetailsTitle";
import prisma from "@/lib/prisma";
import ProductDetails from "@/components/sections/product-details";
import { Product } from "@/app/generated/prisma/client";


export default async function ProdutctDetails({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  return (
    <>
      <main>
        <DetailsTitle
          items={[
            "Home",
            "Men's Caps & Hats",
            "New York Yankees Essential Black Cap",
          ]}
        />

        <section className="products-wrapper mt-15">
          <ProductDetails product={product as Product} />

          {/* RELATED PRODUCTS */}
          <RelatedProduct />
        </section>
      </main>
    </>
  );
}
