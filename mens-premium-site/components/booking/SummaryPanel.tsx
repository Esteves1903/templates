import type { BookingState, BookingStep } from '@/types/booking'

interface SummaryPanelProps {
  booking: BookingState
  step: BookingStep
}

export function SummaryPanel({ booking, step }: SummaryPanelProps) {
  const hasService = !!booking.serviceName
  const hasBarber  = !!booking.barberName
  const hasDate    = !!booking.date && !!booking.time
  const hasContact = !!booking.name

  if (!hasService) return (
    <div className="border border-dashed border-brand-border p-8 text-center">
      <p className="text-brand-muted text-sm">O resumo aparece aqui à medida que avança.</p>
    </div>
  )

  return (
    <div className="border border-brand-border bg-brand-dark divide-y divide-brand-border">
      <div className="px-6 py-4">
        <p className="text-[9px] tracking-[0.4em] uppercase text-brand-gold font-sans">Resumo</p>
      </div>

      <div className="px-6 py-5">
        <p className="text-[10px] tracking-widest uppercase text-brand-muted mb-2">Serviço</p>
        <div className="flex items-center justify-between gap-4">
          <p className="text-brand-stone text-sm font-medium">{booking.serviceName}</p>
          <p className="text-brand-gold font-display text-xl flex-shrink-0">€{booking.servicePrice}</p>
        </div>
      </div>

      {hasBarber && (
        <div className="px-6 py-5">
          <p className="text-[10px] tracking-widest uppercase text-brand-muted mb-2">Barbeiro</p>
          <p className="text-brand-stone text-sm">{booking.barberName}</p>
        </div>
      )}

      {hasDate && (
        <div className="px-6 py-5">
          <p className="text-[10px] tracking-widest uppercase text-brand-muted mb-2">Data & Hora</p>
          <p className="text-brand-stone text-sm">{booking.date!.split('-').reverse().join('/')}</p>
          <p className="text-brand-gold text-sm font-medium mt-0.5">{booking.time}</p>
        </div>
      )}

      {hasContact && (
        <div className="px-6 py-5">
          <p className="text-[10px] tracking-widest uppercase text-brand-muted mb-2">Contacto</p>
          <p className="text-brand-stone text-sm">{booking.name}</p>
          {booking.phone && <p className="text-brand-muted text-xs mt-0.5">{booking.phone}</p>}
        </div>
      )}

      {(!hasBarber || !hasDate || (step === 'contact' && !hasContact)) && (
        <div className="px-6 py-4 space-y-1">
          {!hasBarber && <p className="text-brand-border text-xs">Barbeiro por escolher</p>}
          {!hasDate   && <p className="text-brand-border text-xs">Data e hora por definir</p>}
          {step === 'contact' && !hasContact && (
            <p className="text-brand-border text-xs">Dados de contacto por preencher</p>
          )}
        </div>
      )}
    </div>
  )
}
