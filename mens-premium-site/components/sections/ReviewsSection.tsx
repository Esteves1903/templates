import { SectionHeading } from '@/components/ui/SectionHeading'

const REVIEWS = [
  {
    id:       1,
    author:   'Pedro S.',
    initials: 'PS',
    text:     'Segunda vez que levo o meu filho de 11 anos, simplesmente fantástico.',
    meta:     'há 2 anos',
  },
  {
    id:       2,
    author:   'A. Silva',
    initials: 'AS',
    text:     'Atendimento muito bom. Sempre focado no cliente. Só por marcação, sem esperas. E isso reflete-se no custo.',
    meta:     'Guia Local, 37 críticas',
  },
  {
    id:       3,
    author:   'José Silva',
    initials: 'JS',
    text:     'Ótimo atendimento por parte do Simão. Corta muito bem o cabelo. Recomendo.',
    meta:     'Guia Local, 153 críticas',
  },
  {
    id:       4,
    author:   'Manuel Barbosa',
    initials: 'MB',
    text:     'Excelentes profissionais!!',
    meta:     'Guia Local, 47 críticas',
  },
  {
    id:       5,
    author:   'Ricardo Cavaleiro',
    initials: 'RC',
    text:     'Qualidade, competência!',
    meta:     'Guia Local, 69 críticas',
  },
  {
    id:       6,
    author:   'Alessandro Esperança',
    initials: 'AE',
    text:     'Ótimo atendimento, funcionários atenciosos.',
    meta:     'Guia Local, 168 críticas',
  },
]

export function ReviewsSection() {
  return (
    <section
      className="section-padding bg-brand-black border-t border-brand-border"
      id="reviews"
      aria-labelledby="reviews-heading"
    >
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14 lg:mb-20">
          <SectionHeading
            eyebrow="O que dizem os clientes"
            title="Reviews"
            id="reviews-heading"
          />

          {/* Aggregate rating block */}
          <div className="flex items-center gap-6 lg:pb-2 flex-shrink-0">
            <div className="text-center">
              <p className="font-display text-7xl text-brand-gold leading-none">4.9</p>
              <div className="flex gap-0.5 justify-center mt-2" aria-label="5 estrelas">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="text-brand-gold text-base" aria-hidden="true">★</span>
                ))}
              </div>
              <p className="text-brand-muted text-xs mt-1.5 tracking-widest">Google Reviews</p>
            </div>
            <div className="w-px h-14 bg-brand-border" aria-hidden="true" />
            <p className="text-brand-muted text-sm leading-relaxed">
              Dezenas de avaliações<br />
              <span className="text-brand-stone font-medium">verificadas no Google</span>
            </p>
          </div>
        </div>

        {/* Reviews: horizontal scroll on mobile, grid on desktop */}
        <div className="-mx-4 sm:mx-0">
          <div className="flex gap-4 overflow-x-auto pb-4 px-4 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible snap-x snap-mandatory sm:snap-none">
            {REVIEWS.map(review => (
              <figure
                key={review.id}
                className="group flex-shrink-0 w-[80vw] sm:w-auto snap-start bg-brand-dark border border-brand-border hover:border-brand-gold/30 p-7 flex flex-col gap-5 transition-colors duration-200"
              >
                {/* Stars */}
                <div className="flex gap-0.5" aria-label="5 estrelas">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-brand-gold text-sm" aria-hidden="true">★</span>
                  ))}
                </div>

                <blockquote className="flex-1">
                  <p className="text-brand-stone/85 leading-relaxed italic font-display">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </blockquote>

                <figcaption className="flex items-center gap-3 pt-4 border-t border-brand-border">
                  <div className="w-9 h-9 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center flex-shrink-0 group-hover:border-brand-gold/40 transition-colors">
                    <span className="text-brand-gold font-bold text-xs">{review.initials}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-brand-stone text-sm font-medium truncate">{review.author}</p>
                    <p className="text-brand-muted text-xs truncate">{review.meta}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="text-center mt-10 text-brand-muted text-xs tracking-widest">
          Ver todas as avaliações no{' '}
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold hover:text-brand-gold-light underline underline-offset-4 transition-colors"
          >
            Google Maps
          </a>
        </p>
      </div>
    </section>
  )
}
