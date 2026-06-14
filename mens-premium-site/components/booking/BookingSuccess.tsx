import { Button } from '@/components/ui/Button'
import type { BookingState } from '@/types/booking'

interface BookingSuccessProps {
  booking: BookingState
}

export function BookingSuccess({ booking }: BookingSuccessProps) {
  const firstName = booking.name.split(' ')[0]
  const formattedDate = booking.date?.split('-').reverse().join('/') ?? '-'

  return (
    <div className="text-center max-w-lg mx-auto py-8">
      {/* Animated checkmark ring */}
      <div className="relative w-24 h-24 mx-auto mb-10">
        <div className="w-24 h-24 rounded-full border-2 border-brand-gold flex items-center justify-center">
          <span className="text-brand-gold text-4xl font-display" aria-hidden="true">✓</span>
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-brand-gold/20 scale-125" aria-hidden="true" />
      </div>

      <p className="text-brand-gold text-[10px] tracking-[0.5em] uppercase font-sans mb-5">
        Marcação Confirmada
      </p>

      <h2 className="font-display text-3xl sm:text-4xl text-brand-stone mb-4">
        Até breve, <em className="text-brand-gold not-italic">{firstName}</em>!
      </h2>

      <p className="text-brand-muted text-sm mb-10 leading-relaxed">
        Marcação registada com sucesso.
        {booking.email && (
          <> Receberá uma confirmação em <strong className="text-brand-stone">{booking.email}</strong>.</>
        )}
      </p>

      {/* Summary card */}
      <div className="bg-brand-dark border border-brand-gold/20 text-left mb-10">
        {[
          { label: 'Serviço',   value: booking.serviceName ?? '-' },
          { label: 'Barbeiro',  value: booking.barberName  ?? '-' },
          { label: 'Data',      value: formattedDate },
          { label: 'Hora',      value: booking.time ?? '-' },
          { label: 'Contacto',  value: booking.phone },
          { label: 'Total',     value: `€${booking.servicePrice}`, gold: true },
        ].map((row, i, arr) => (
          <div
            key={row.label}
            className={`flex items-center justify-between px-6 py-4 ${i < arr.length - 1 ? 'border-b border-brand-border' : ''}`}
          >
            <span className="text-brand-muted text-sm">{row.label}</span>
            <span className={`font-medium text-sm ${row.gold ? 'text-brand-gold font-display text-lg' : 'text-brand-stone'}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-brand-gold/5 border border-brand-gold/15 px-5 py-4 text-sm text-brand-muted mb-10 text-left">
        Para cancelar ou reagendar, por favor contacte-nos com pelo menos{' '}
        <strong className="text-brand-stone">24 horas de antecedência</strong>.
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button href="/" variant="outline-gold">
          Voltar ao Site
        </Button>
        <Button href="/book" variant="gold">
          Nova Marcação
        </Button>
      </div>
    </div>
  )
}
