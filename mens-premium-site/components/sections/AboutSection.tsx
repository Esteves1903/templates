import { AnimatedStat } from '@/components/ui/AnimatedStat'
import { ReviewRotator } from '@/components/ui/ReviewRotator'

const STATS = [
  { value: '5+',   label: 'Anos de Excelência',   sub: 'Barbearia premium de referência' },
  { value: '500+', label: 'Clientes Satisfeitos', sub: 'E a crescer todos os dias' },
  { value: '4.9★', label: 'Avaliação no Google',  sub: 'Baseado em dezenas de reviews' },
  { value: '100%', label: 'Só por Marcação',       sub: 'Sem esperas, sem surpresas' },
]

export function AboutSection() {
  return (
    <section className="section-padding bg-brand-dark border-t border-brand-border" id="sobre">
      <div className="container-wide">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border mb-20 lg:mb-28">
          {STATS.map(stat => (
            <AnimatedStat key={stat.value} {...stat} />
          ))}
        </div>

        {/* Brand story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <p className="text-brand-gold text-[10px] tracking-[0.5em] uppercase font-sans mb-5">
              A Nossa História
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-brand-stone leading-tight mb-8">
              Mais do que um corte.<br />
              <em className="text-brand-gold">Uma experiência.</em>
            </h2>
            <div className="space-y-5 text-brand-muted leading-relaxed">
              <p>
                Na Exemplo, cada visita é pensada ao detalhe. Desde o momento em que entra,
                até ao toque final do produto de styling - tudo é feito com propósito.
              </p>
              <p>
                Só trabalhamos por marcação porque acreditamos que o seu tempo é valioso. Sem esperas,
                sem pressas. O seu horário é cumprido.
              </p>
              <p className="text-brand-stone/80">
                A nossa equipa está em formação contínua para dominar as técnicas mais actuais,
                mantendo sempre o standard de qualidade que nos tornou referência.
              </p>
            </div>
          </div>

          {/* Rotating reviews */}
          <div className="relative">
            <ReviewRotator />
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-brand-gold/20 -z-10" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
