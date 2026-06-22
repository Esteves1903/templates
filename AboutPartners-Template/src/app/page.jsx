import Hero from '@/components/home/Hero';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BrandsCarousel from '@/components/home/BrandsCarousel';

export const metadata = { title: 'AutoPeças — Peças Automóveis' };

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandsCarousel />
    </>
  );
}
