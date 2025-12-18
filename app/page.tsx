import Hero from '@/components/sections/Hero';
import Categories from '@/components/sections/Categories';
import HeroTwo from '@/components/sections/HeroTwo';
import JustForYou from '@/components/sections/JustForYou';
import Newsletter from '@/components/sections/Newsletter';
import TrendingNow from '@/components/sections/TrendingNow';
import ServiceHighlights from '@/components/sections/ServiceHighlights';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import BestDeals from '@/components/sections/BestDeals';
import prisma from '@/lib/prisma';

export default async function Home() {
  const products = await prisma.product.findMany();
  const categories = await prisma.category.findMany();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="space-y-[50px] md:space-y-20 lg:space-y-[120px] mt-[50px] md:mt-20 lg:mt-[120px]">
          <Categories categories={categories} />
          <BestDeals products={products} />
        </div>
        <div className="mt-[50px] md:mt-20 lg:mt-[120px]">
          <HeroTwo />
        </div>
        <div className="space-y-[50px] md:space-y-20 lg:space-y-[120px] mt-[50px] md:mt-20 lg:mt-[120px]">
          <JustForYou products={products} categories={categories} />
          <Newsletter />
          <TrendingNow />
          <ServiceHighlights />
        </div>
      </main>
      <Footer />
    </>
  );
}
