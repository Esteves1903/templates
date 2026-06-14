import { Button } from '@/components/ui/Button'

export function BookingCtaSection() {
  return (
    <section
      className="relative overflow-hidden bg-brand-surface border-t border-brand-border"
      aria-labelledby="cta-heading"
    >
      {/* Gold horizontal accent lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" aria-hidden="true" />

      {/* Large background number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span className="font-display text-[30vw] font-bold text-brand-gold/[0.03] leading-none">MP</span>
      </div>

      <div className="container-wide py-24 lg:py-32 text-center relative z-10">
        <p className="text-brand-gold text-[10px] tracking-[0.5em] uppercase font-sans mb-8">
          Reserve o seu momento
        </p>

        <h2
          id="cta-heading"
          className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-brand-stone leading-tight mb-8 text-balance"
        >
          Pronto para a sua<br />
          <em className="text-brand-gold">experiência premium?</em>
        </h2>

        <p className="text-brand-muted max-w-md mx-auto mb-12 leading-relaxed">
          Agende online em menos de 2 minutos. Escolha o serviço, a data e a hora - e apareça.
          Nós tratamos do resto.
        </p>

        <Button href="/book" variant="gold" size="lg">
          Agendar Agora
        </Button>

        <p className="mt-6 text-brand-muted text-xs tracking-widest">
          Cancelamento gratuito com 24h de antecedência
        </p>
      </div>
    </section>
  )
}
