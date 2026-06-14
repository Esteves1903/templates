'use client'

import { type FormEvent, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { BookingState } from '@/types/booking'

interface ClientFormProps {
  booking:  BookingState
  onUpdate: (updates: Partial<BookingState>) => void
  onSubmit: () => void
  onBack:   () => void
}

export function ClientForm({ booking, onUpdate, onSubmit, onBack }: ClientFormProps) {
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [touched, setTouched] = useState({ phone: false, email: false })

  const validatePhone = (val: string) => {
    if (!val.trim()) {
      return 'O telemóvel é obrigatório.'
    }
    const clean = val.replace(/[\s\-]/g, '')
    const isPtPhone = /^(\+351|00351)?9\d{8}$/.test(clean)
    if (!isPtPhone) {
      return 'Por favor, introduza um número de telemóvel válido (ex: 9xx xxx xxx).'
    }
    return null
  }

  const validateEmail = (val: string) => {
    if (!val.trim()) return null
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
    if (!isValid) {
      return 'Por favor, introduza um endereço de email válido.'
    }
    return null
  }

  const handlePhoneChange = (val: string) => {
    onUpdate({ phone: val })
    if (touched.phone) {
      setPhoneError(validatePhone(val))
    }
  }

  const handleEmailChange = (val: string) => {
    onUpdate({ email: val })
    if (touched.email) {
      setEmailError(validateEmail(val))
    }
  }

  const handlePhoneBlur = () => {
    setTouched(prev => ({ ...prev, phone: true }))
    setPhoneError(validatePhone(booking.phone))
  }

  const handleEmailBlur = () => {
    setTouched(prev => ({ ...prev, email: true }))
    setEmailError(validateEmail(booking.email))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Mark all as touched and validate
    setTouched({ phone: true, email: true })
    const pErr = validatePhone(booking.phone)
    const eErr = validateEmail(booking.email)

    setPhoneError(pErr)
    setEmailError(eErr)

    if (!pErr && !eErr && booking.name.trim()) {
      onSubmit()
    }
  }

  const inputClasses = (hasError: boolean) =>
    cn(
      'w-full bg-brand-dark border px-4 py-3 text-brand-text placeholder-brand-muted/40 focus:outline-none transition-colors duration-200 text-sm',
      hasError ? 'border-red-500/50 focus:border-red-500' : 'border-brand-border focus:border-brand-gold'
    )

  return (
    <div>
      <h2 className="font-display text-3xl sm:text-4xl text-brand-stone mb-2">
        Os seus dados
      </h2>
      <p className="text-brand-muted text-sm mb-10">
        Usaremos apenas para confirmar e lembrar a sua marcação
      </p>

      {/* Booking summary */}
      <div className="bg-brand-dark border border-brand-gold/25 p-5 mb-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-brand-gold mb-4">
          Resumo da Marcação
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Serviço',  value: booking.serviceName ?? '-' },
            { label: 'Data',     value: booking.date ? booking.date.split('-').reverse().join('/') : '-' },
            { label: 'Hora',     value: booking.time ?? '-' },
            { label: 'Total',    value: `€${booking.servicePrice}`, gold: true },
          ].map(item => (
            <div key={item.label}>
              <p className="text-[10px] tracking-widest uppercase text-brand-muted mb-1">{item.label}</p>
              <p className={`font-medium text-sm ${item.gold ? 'text-brand-gold font-display text-base' : 'text-brand-stone'}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg" noValidate>
        <div>
          <label htmlFor="booking-name" className="block text-xs tracking-[0.3em] uppercase text-brand-muted mb-2">
            Nome completo <span aria-hidden="true" className="text-brand-gold">*</span>
          </label>
          <input
            id="booking-name"
            type="text"
            required
            autoComplete="name"
            value={booking.name}
            onChange={e => onUpdate({ name: e.target.value })}
            placeholder="João Silva"
            className={inputClasses(false)}
          />
        </div>

        <div>
          <label htmlFor="booking-phone" className="block text-xs tracking-[0.3em] uppercase text-brand-muted mb-2">
            Telemóvel <span aria-hidden="true" className="text-brand-gold">*</span>
          </label>
          <input
            id="booking-phone"
            type="tel"
            required
            autoComplete="tel"
            value={booking.phone}
            onChange={e => handlePhoneChange(e.target.value)}
            onBlur={handlePhoneBlur}
            placeholder="+351 9XX XXX XXX"
            className={inputClasses(!!phoneError)}
            aria-invalid={!!phoneError}
            aria-describedby={phoneError ? 'booking-phone-error' : undefined}
          />
          {phoneError && (
            <p id="booking-phone-error" aria-live="polite" className="text-red-400 text-xs mt-1.5">
              {phoneError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="booking-email" className="block text-xs tracking-[0.3em] uppercase text-brand-muted mb-2">
            Email <span className="text-brand-muted/60 font-normal normal-case tracking-normal">(opcional)</span>
          </label>
          <input
            id="booking-email"
            type="email"
            autoComplete="email"
            value={booking.email}
            onChange={e => handleEmailChange(e.target.value)}
            onBlur={handleEmailBlur}
            placeholder="joao@exemplo.com"
            className={inputClasses(!!emailError)}
            aria-invalid={!!emailError}
            aria-describedby={emailError ? 'booking-email-error' : undefined}
          />
          {emailError && (
            <p id="booking-email-error" aria-live="polite" className="text-red-400 text-xs mt-1.5">
              {emailError}
            </p>
          )}
        </div>

        <div className="flex gap-4 pt-2">
          <Button type="button" variant="ghost" onClick={onBack}>
            Voltar
          </Button>
          <Button
            type="submit"
            variant="gold"
            disabled={!booking.name.trim() || !booking.phone.trim()}
          >
            Confirmar Marcação
          </Button>
        </div>
      </form>
    </div>
  )
}
