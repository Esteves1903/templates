import { Button } from '@/components/ui/Button'
import { ReviewCarousel } from '@/components/ui/ReviewCarousel'

export function HeroSection() {
  return (
    <section
      className="relative flex flex-col min-h-[100dvh] bg-brand-black overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Diagonal background split */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-y-0 right-0 w-[48%] bg-brand-surface clip-hero-diagonal"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_25%_55%,rgba(201,168,76,0.05),transparent)]" />
      </div>

      {/* Navbar spacer */}
      <div className="h-24 flex-shrink-0" aria-hidden="true" />

      {/* Main content */}
      <div className="container-wide relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-8 items-center py-12 lg:py-16">

        {/* Left: typography */}
        <div>
          <p className="text-brand-gold text-[10px] tracking-[0.45em] uppercase font-sans mb-8">
            Barbearia e Imagem Pessoal
          </p>

          <h1
            id="hero-heading"
            className="font-display leading-[0.88] tracking-tight mb-8"
          >
            <span className="block text-brand-stone text-[clamp(3rem,6.5vw,6rem)]">
              A Arte
            </span>
            <span className="block text-brand-gold italic text-[clamp(3rem,6.5vw,6rem)]">
              de Ser
            </span>
            <span className="block text-brand-stone text-[clamp(3rem,6.5vw,6rem)]">
              Premium.
            </span>
          </h1>

          <p className="text-brand-muted leading-relaxed mb-10 max-w-sm">
            Cortes de precisão, barba e tratamentos exclusivos.{' '}
            <span className="text-brand-stone/70">Só por marcação - sem esperas.</span>
          </p>

          <div className="flex flex-wrap gap-4">
            <Button href="/book" variant="gold" size="lg">
              Agendar Agora
            </Button>
            <Button href="/#servicos" variant="outline-gold" size="lg">
              Ver Serviços
            </Button>
          </div>
        </div>

        {/* Right: rotating review card deck */}
        <div className="flex justify-center lg:justify-end pb-8">
          <ReviewCarousel />
        </div>
      </div>

      {/* Info bar */}
      <div className="container-wide relative z-10 py-5 border-t border-brand-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-6 text-xs text-brand-muted">
          <span>Seg a Sex &nbsp;09h às 19h</span>
          <span>Sáb &nbsp;09h às 18h</span>
          <span className="text-brand-border">Dom: Fechado</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-brand-gold text-xs tracking-widest" aria-hidden="true">★★★★★</span>
          <span className="text-brand-muted text-xs">4.9 Google Reviews</span>
        </div>
      </div>
    </section>
  )
}
