'use client'

import { useState, useCallback } from 'react'
import { ServiceSelector } from './ServiceSelector'
import { BarberSelector } from './BarberSelector'
import { DateTimePicker } from './DateTimePicker'
import { ClientForm } from './ClientForm'
import { BookingSuccess } from './BookingSuccess'
import { SummaryPanel } from './SummaryPanel'
import { cn } from '@/lib/utils'
import type { BookingState, BookingStep } from '@/types/booking'

const STEPS: BookingStep[] = ['service', 'barber', 'datetime', 'contact', 'success']

const STEP_KEYS: Exclude<BookingStep, 'success'>[] = ['service', 'barber', 'datetime', 'contact']

const STEP_META: Record<Exclude<BookingStep, 'success'>, { num: string; label: string }> = {
  service:  { num: '01', label: 'Serviço' },
  barber:   { num: '02', label: 'Barbeiro' },
  datetime: { num: '03', label: 'Data & Hora' },
  contact:  { num: '04', label: 'Dados' },
}

const INITIAL: BookingState = {
  serviceId: null, serviceName: null, servicePrice: null,
  barberId:  null, barberName:  null,
  date: null, time: null, name: '', phone: '', email: '',
}

export function BookingFlow() {
  const [step,    setStep]    = useState<BookingStep>('service')
  const [booking, setBooking] = useState<BookingState>(INITIAL)

  const update = useCallback((u: Partial<BookingState>) => {
    setBooking(p => ({ ...p, ...u }))
  }, [])

  const goTo = useCallback((t: BookingStep) => setStep(t), [])

  const currentIdx = STEPS.indexOf(step)

  return (
    <div className="min-h-screen bg-brand-black">
      {step !== 'success' && (
        <div className="border-b border-brand-border bg-brand-dark/80 backdrop-blur-sm sticky top-[57px] z-40">
          <div className="container-wide max-w-5xl py-4">
            <nav aria-label="Progresso da marcação">
              <ol className="flex items-center gap-2">
                {STEP_KEYS.map((key, i) => {
                  const meta = STEP_META[key]
                  const idx         = STEPS.indexOf(key)
                  const isCompleted = idx < currentIdx
                  const isCurrent   = key === step
                  return (
                    <li key={key} className="flex items-center gap-2 flex-1 last:flex-none">
                      <div className={cn(
                        'flex items-center gap-2',
                        isCurrent   ? 'text-brand-gold'    :
                        isCompleted ? 'text-brand-gold/50' :
                                      'text-brand-muted'
                      )}>
                        <div className={cn(
                          'w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center text-[10px] font-bold',
                          isCompleted ? 'bg-brand-gold border-brand-gold text-brand-black' :
                          isCurrent   ? 'border-brand-gold text-brand-gold' :
                                        'border-brand-border text-brand-muted'
                        )}>
                          {isCompleted ? '✓' : meta.num}
                        </div>
                        <span className="hidden sm:block text-[10px] tracking-[0.2em] uppercase font-medium whitespace-nowrap">
                          {meta.label}
                        </span>
                      </div>
                      {i < 3 && (
                        <div
                          className={cn('flex-1 h-px mx-1', isCompleted ? 'bg-brand-gold/30' : 'bg-brand-border')}
                          aria-hidden="true"
                        />
                      )}
                    </li>
                  )
                })}
              </ol>
            </nav>
          </div>
        </div>
      )}

      {/* Main grid */}
      <div className={cn(
        'container-wide max-w-5xl py-12 lg:py-16',
        step !== 'success' && 'grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-14 items-start'
      )}>
        {/* Active step */}
        <div>
          {step === 'service' && (
            <ServiceSelector
              selectedId={booking.serviceId}
              onSelect={(id, name, price) => {
                update({ serviceId: id, serviceName: name, servicePrice: price })
                goTo('barber')
              }}
            />
          )}
          {step === 'barber' && (
            <BarberSelector
              selectedId={booking.barberId}
              onSelect={(id, name) => {
                update({ barberId: id, barberName: name })
                goTo('datetime')
              }}
              onBack={() => goTo('service')}
            />
          )}
          {step === 'datetime' && (
            <DateTimePicker
              selectedDate={booking.date}
              selectedTime={booking.time}
              onSelect={(date, time) => { update({ date, time }); goTo('contact') }}
              onBack={() => goTo('barber')}
            />
          )}
          {step === 'contact' && (
            <ClientForm
              booking={booking}
              onUpdate={update}
              onSubmit={() => goTo('success')}
              onBack={() => goTo('datetime')}
            />
          )}
          {step === 'success' && <BookingSuccess booking={booking} />}
        </div>

        {/* Summary sidebar */}
        {step !== 'success' && (
          <div className="lg:sticky lg:top-32">
            <SummaryPanel booking={booking} step={step} />
          </div>
        )}
      </div>
    </div>
  )
}
