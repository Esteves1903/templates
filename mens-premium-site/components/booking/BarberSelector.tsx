'use client'

import { cn } from '@/lib/utils'

interface Barber {
  id:       string
  initials: string
  name:     string
  role:     string
  spec:     string
}

const BARBERS: Barber[] = [
  {
    id:       'qualquer',
    initials: 'QQ',
    name:     'Sem preferência',
    role:     'Próximo disponível',
    spec:     'O barbeiro disponível no horário escolhido',
  },
  {
    id:       'mb',
    initials: 'MB',
    name:     'Mestre Barbeiro',
    role:     'Fundador & Master Barber',
    spec:     'Corte clássico, navalha reta, degradé técnico',
  },
  {
    id:       'b2',
    initials: 'B2',
    name:     'Barbeiro 02',
    role:     'Senior Barber',
    spec:     'Fade & Degradé, sobrancelhas, barba',
  },
  {
    id:       'b3',
    initials: 'B3',
    name:     'Barbeiro 03',
    role:     'Barber',
    spec:     'Corte moderno, tratamentos capilares',
  },
]

interface Props {
  selectedId: string | null
  onSelect:   (id: string, name: string) => void
  onBack:     () => void
}

export function BarberSelector({ selectedId, onSelect, onBack }: Props) {
  return (
    <div>
      <h2 className="font-display text-3xl sm:text-4xl text-brand-stone mb-1">
        Escolha o barbeiro
      </h2>
      <p className="text-brand-muted text-sm mb-10">
        Clique para seleccionar e avançar automaticamente
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BARBERS.map(barber => {
          const isSelected = selectedId === barber.id
          const isAny      = barber.id === 'qualquer'

          return (
            <button
              key={barber.id}
              onClick={() => onSelect(barber.id, barber.name)}
              aria-pressed={isSelected}
              className={cn(
                'text-left p-6 border transition-all duration-200 group flex items-start gap-4',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black',
                isSelected
                  ? 'border-brand-gold bg-brand-surface'
                  : 'border-brand-border bg-brand-dark hover:border-brand-gold/40 hover:bg-brand-surface',
                isAny && !isSelected && 'border-dashed'
              )}
            >
              {/* Avatar */}
              <div className={cn(
                'w-12 h-12 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors duration-200',
                isSelected
                  ? 'bg-brand-gold/15 border-brand-gold'
                  : 'bg-brand-surface border-brand-border group-hover:border-brand-gold/40'
              )}>
                <span className={cn(
                  'font-display font-bold text-sm transition-colors duration-200',
                  isSelected ? 'text-brand-gold' : 'text-brand-muted group-hover:text-brand-gold/70'
                )}>
                  {isAny ? '?' : barber.initials}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'font-display text-base leading-tight mb-0.5 transition-colors duration-200',
                  isSelected ? 'text-brand-gold' : 'text-brand-stone group-hover:text-brand-gold'
                )}>
                  {barber.name}
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-brand-muted mb-2">
                  {barber.role}
                </p>
                <p className="text-brand-muted text-xs leading-relaxed hidden sm:block">
                  {barber.spec}
                </p>
              </div>

              {/* Selected dot */}
              <div className={cn(
                'w-4 h-4 rounded-full border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200',
                isSelected ? 'bg-brand-gold border-brand-gold' : 'border-brand-border group-hover:border-brand-gold/40'
              )}>
                {isSelected && <span className="text-brand-black text-[8px] font-bold leading-none">✓</span>}
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-8">
        <button
          onClick={onBack}
          className="text-brand-muted text-sm hover:text-brand-stone transition-colors"
        >
          Voltar
        </button>
      </div>
    </div>
  )
}
