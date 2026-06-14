'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const MONTH_NAMES = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
]
const DAY_NAMES   = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
const TIME_SLOTS  = [
  '09:00','09:30','10:00','10:30','11:00','11:30',
  '14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30',
]

interface DateTimePickerProps {
  selectedDate: string | null
  selectedTime: string | null
  onSelect:     (date: string, time: string) => void
  onBack:       () => void
}

export function DateTimePicker({ selectedDate, selectedTime, onSelect, onBack }: DateTimePickerProps) {
  const today      = useMemo(() => new Date(), [])
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear,  setViewYear]  = useState(today.getFullYear())
  const [localDate, setLocalDate] = useState<string | null>(selectedDate)
  const [localTime, setLocalTime] = useState<string | null>(selectedTime)

  const calendarDays = useMemo(() => {
    const firstDow   = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    return [
      ...Array<null>(firstDow).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ]
  }, [viewMonth, viewYear])

  const isAvailable = (day: number) => {
    const d   = new Date(viewYear, viewMonth, day)
    const tod = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return d >= tod && d.getDay() !== 0
  }

  const toDateStr = (day: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  const canPrev = viewYear > today.getFullYear() || viewMonth > today.getMonth()

  const prevMonth = () => {
    if (!canPrev) return
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  return (
    <div>
      <h2 className="font-display text-3xl sm:text-4xl text-brand-stone mb-2">
        Escolha a data e hora
      </h2>
      <p className="text-brand-muted text-sm mb-10">
        Disponível Segunda a Sábado, 09h às 18h
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-brand-dark border border-brand-border p-6">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              disabled={!canPrev}
              aria-label="Mês anterior"
              className="w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-gold disabled:opacity-25 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold"
            >
              &lt;
            </button>
            <span className="font-display text-brand-stone">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              onClick={nextMonth}
              aria-label="Próximo mês"
              className="w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold"
            >
              &gt;
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 mb-1">
            {DAY_NAMES.map(d => (
              <div key={d} className="text-center text-[10px] uppercase tracking-widest text-brand-muted py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-0.5">
            {calendarDays.map((day, i) => (
              <div key={i}>
                {day === null ? (
                  <div className="aspect-square" />
                ) : (
                  <button
                    onClick={() => isAvailable(day) && setLocalDate(toDateStr(day))}
                    disabled={!isAvailable(day)}
                    aria-label={`${day} de ${MONTH_NAMES[viewMonth]} de ${viewYear}`}
                    aria-pressed={localDate === toDateStr(day)}
                    className={cn(
                      'w-full aspect-square flex items-center justify-center text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold',
                      isAvailable(day)
                        ? localDate === toDateStr(day)
                          ? 'bg-brand-gold text-brand-black font-bold'
                          : 'text-brand-text hover:bg-brand-gold/15 hover:text-brand-gold'
                        : 'text-brand-border cursor-not-allowed'
                    )}
                  >
                    {day}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Time slots */}
        <div>
          <h3 className="text-xs tracking-[0.3em] uppercase text-brand-muted mb-5">
            {localDate
              ? `Horários: ${localDate.split('-').reverse().join('/')}`
              : 'Selecione primeiro uma data'}
          </h3>

          {localDate ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2">
              {TIME_SLOTS.map(time => (
                <button
                  key={time}
                  onClick={() => setLocalTime(time)}
                  aria-pressed={localTime === time}
                  className={cn(
                    'py-3 border text-sm font-medium tracking-wider transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black',
                    localTime === time
                      ? 'bg-brand-gold border-brand-gold text-brand-black'
                      : 'border-brand-border text-brand-muted hover:border-brand-gold/50 hover:text-brand-gold'
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center border border-dashed border-brand-border">
              <p className="text-brand-muted text-sm">Selecione primeiro uma data</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-10">
        <Button variant="ghost" onClick={onBack}>Voltar</Button>
        <Button
          variant="gold"
          disabled={!localDate || !localTime}
          onClick={() => { if (localDate && localTime) onSelect(localDate, localTime) }}
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
