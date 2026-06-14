'use client'

import { cn } from '@/lib/utils'

interface Service {
  id:        string
  number:    string
  name:      string
  desc:      string
  duration:  string
  price:     number
  featured?: boolean
}

export const SERVICES: Service[] = [
  {
    id:       'corte',
    number:   '01',
    name:     'Corte Clássico',
    desc:     'Corte personalizado com finalização a tesoura e produto premium.',
    duration: '45 min',
    price:    18,
  },
  {
    id:       'fade',
    number:   '02',
    name:     'Fade & Degradé',
    desc:     'Degradé técnico com transição impecável máquina-tesoura.',
    duration: '50 min',
    price:    20,
  },
  {
    id:       'barba',
    number:   '03',
    name:     'Barba Completa',
    desc:     'Modelação, navalha reta, hot towel e hidratação pós-barbear.',
    duration: '30 min',
    price:    15,
  },
  {
    id:       'corte-barba',
    number:   '04',
    name:     'Corte + Barba',
    desc:     'O combo completo, corte de precisão e ritual de barba num só momento.',
    duration: '70 min',
    price:    30,
    featured: true,
  },
  {
    id:       'sobrancelhas',
    number:   '05',
    name:     'Sobrancelhas',
    desc:     'Definição e design das sobrancelhas com navalha.',
    duration: '15 min',
    price:    8,
  },
  {
    id:       'shampoo',
    number:   '06',
    name:     'Shampoo & Tratamento',
    desc:     'Lavagem com produtos premium e tratamento capilar nutritivo.',
    duration: '20 min',
    price:    12,
  },
]

interface Props {
  selectedId: string | null
  onSelect:   (id: string, name: string, price: number) => void
}

export function ServiceSelector({ selectedId, onSelect }: Props) {
  return (
    <div>
      <h2 className="font-display text-3xl sm:text-4xl text-brand-stone mb-1">
        Escolha o serviço
      </h2>
      <p className="text-brand-muted text-sm mb-10">
        Clique para seleccionar e avançar automaticamente
      </p>

      <div className="divide-y divide-brand-border border border-brand-border">
        {SERVICES.map(service => {
          const isSelected = selectedId === service.id
          return (
            <button
              key={service.id}
              onClick={() => onSelect(service.id, service.name, service.price)}
              aria-pressed={isSelected}
              className={cn(
                'w-full text-left flex items-center gap-5 px-6 py-5 transition-all duration-200 group',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-gold',
                isSelected
                  ? 'bg-brand-surface border-l-[3px] border-l-brand-gold'
                  : 'bg-brand-dark hover:bg-brand-surface border-l-[3px] border-l-transparent hover:border-l-brand-gold/40'
              )}
            >
              {/* Number */}
              <span className={cn(
                'font-display text-xl font-bold flex-shrink-0 w-7 transition-colors duration-200',
                isSelected ? 'text-brand-gold' : 'text-brand-border group-hover:text-brand-gold/30'
              )}>
                {service.number}
              </span>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={cn(
                    'font-display text-base transition-colors duration-200',
                    isSelected ? 'text-brand-gold' : 'text-brand-stone group-hover:text-brand-gold'
                  )}>
                    {service.name}
                  </span>
                  {service.featured && (
                    <span className="text-[8px] tracking-[0.25em] uppercase bg-brand-gold text-brand-black px-1.5 py-0.5 font-medium flex-shrink-0">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-brand-muted text-xs leading-relaxed hidden sm:block">{service.desc}</p>
              </div>

              {/* Duration + Price */}
              <div className="text-right flex-shrink-0">
                <p className="text-brand-gold font-display text-xl mb-0.5">€{service.price}</p>
                <p className="text-brand-muted text-[10px]">{service.duration}</p>
              </div>

              {/* Dot indicator */}
              <div className={cn(
                'w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-200',
                isSelected ? 'bg-brand-gold border-brand-gold' : 'border-brand-border group-hover:border-brand-gold/40'
              )}>
                {isSelected && <span className="text-brand-black text-[8px] font-bold leading-none">✓</span>}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
