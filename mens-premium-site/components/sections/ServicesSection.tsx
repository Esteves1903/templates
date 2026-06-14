import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

const SERVICES = [
  {
    
    name:     'Corte Clássico',
    desc:     'Corte personalizado com finalização a tesoura e produto de styling premium.',
    duration: '45 min',
    price:    18,
    tags:     ['Tesoura', 'Styling'],
  },
  {
    
    name:     'Fade & Degradé',
    desc:     'Degradé técnico com transição impecável entre máquina e tesoura.',
    duration: '50 min',
    price:    20,
    tags:     ['Máquina', 'Transição'],
  },
  {
    
    name:     'Barba Completa',
    desc:     'Modelação com navalha reta, toalha quente e hidratação pós-barbear.',
    duration: '30 min',
    price:    15,
    tags:     ['Navalha', 'Hot Towel'],
  },
  {
    
    name:     'Corte + Barba',
    desc:     'O combo completo - corte de precisão e ritual de barba num só momento.',
    duration: '70 min',
    price:    30,
    tags:     ['Combo'],
    featured: true,
  },
  {
    
    name:     'Sobrancelhas',
    desc:     'Definição, modelação e design das sobrancelhas com navalha.',
    duration: '15 min',
    price:    8,
    tags:     ['Design'],
  },
  {
    
    name:     'Shampoo & Tratamento',
    desc:     'Lavagem com produtos premium e tratamento capilar nutritivo.',
    duration: '20 min',
    price:    12,
    tags:     ['Capilar'],
  },
]

export function ServicesSection() {
  return (
    <section className="section-padding bg-brand-black" id="servicos" aria-labelledby="servicos-heading">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 lg:mb-20">
          <SectionHeading
            eyebrow="O que oferecemos"
            title="Serviços"
            id="servicos-heading"
          />
         
        </div>

        {/* Services list - editorial style */}
        <div className="divide-y divide-brand-border border-y border-brand-border">
          {SERVICES.map(service => (
            <article
              key={service.name}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 lg:gap-10 py-7 lg:py-8 hover:bg-brand-surface/40 px-2 lg:px-4 transition-colors duration-200 relative overflow-hidden"
            >
              {/* Gold hover line */}
              <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-0.5 bg-brand-gold transition-all duration-300" aria-hidden="true" />

             

              {/* Name + desc */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-display text-xl lg:text-2xl text-brand-stone group-hover:text-brand-gold transition-colors duration-200">
                    {service.name}
                  </h3>
                  {service.featured && (
                    <span className="text-[9px] tracking-[0.3em] uppercase bg-brand-gold text-brand-black px-2 py-0.5 font-medium flex-shrink-0">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-brand-muted text-sm leading-relaxed hidden sm:block">{service.desc}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-[10px] tracking-widest uppercase text-brand-gold/60 border border-brand-gold/15 px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price + duration */}
              <div className="text-right flex-shrink-0">
                <p className="font-display text-2xl lg:text-3xl text-brand-gold font-semibold">
                  €{service.price}
                </p>
                <p className="text-brand-muted text-xs tracking-widest mt-1">
                  {service.duration}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
          <p className="text-brand-muted text-sm">
            Preços sujeitos a consulta consoante o comprimento e condição do cabelo.
          </p>
          <Button href="/book" variant="gold" size="lg">
            Agendar Serviço
          </Button>
        </div>
      </div>
    </section>
  )
}
