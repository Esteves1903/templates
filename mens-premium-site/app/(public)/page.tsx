import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { ReviewsSection } from '@/components/sections/ReviewsSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { BookingCtaSection } from '@/components/sections/BookingCtaSection'
import { LocationSection } from '@/components/sections/LocationSection'

export const metadata: Metadata = {
  title: "Exemplo | Barbearia e Imagem Pessoal",
  alternates: {
    canonical: 'https://exemplo.pt',
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TeamSection />
        <GallerySection />
        <ReviewsSection />
        <BookingCtaSection />
        <LocationSection />
      </main>
      <Footer />
    </>
  )
}
