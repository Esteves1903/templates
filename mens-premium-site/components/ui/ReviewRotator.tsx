'use client'

import { useState, useEffect, useCallback } from 'react'

const REVIEWS = [
  {
    initials: 'AS',
    author:   'A. Silva',
    meta:     'Guia Local, 37 críticas',
    text:     'Atendimento muito bom. Sempre focado no cliente. Só por marcação, mas sem esperas. E isso reflete-se no custo.',
  },
  {
    initials: 'JS',
    author:   'José Silva',
    meta:     'Guia Local, 153 críticas',
    text:     'Ótimo atendimento por parte do Simão. Corta muito bem o cabelo. Recomendo.',
  },
  {
    initials: 'MB',
    author:   'Manuel Barbosa',
    meta:     'Guia Local, 47 críticas',
    text:     'Excelentes profissionais!!',
  },
  {
    initials: 'AE',
    author:   'Alessandro Esperança',
    meta:     'Guia Local, 168 críticas',
    text:     'Ótimo atendimento, funcionários atenciosos.',
  },
  {
    initials: 'RC',
    author:   'Ricardo Cavaleiro',
    meta:     'Guia Local, 69 críticas',
    text:     'Qualidade, competência!',
  },
]

type Phase = 'in' | 'out' | 'reset'

const PHASE_CLASSES: Record<Phase, string> = {
  in:    'opacity-100 translate-y-0 transition-all duration-[480ms] ease-out',
  out:   'opacity-0 -translate-y-5 transition-all duration-[260ms] ease-in',
  reset: 'opacity-0 translate-y-5 transition-none',
}

const INTERVAL = 5000

export function ReviewRotator() {
  const [idx,   setIdx]   = useState(0)
  const [phase, setPhase] = useState<Phase>('in')

  const goTo = useCallback((newIdx: number) => {
    setPhase('out')
    setTimeout(() => {
      setIdx(newIdx)
      setPhase('reset')
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase('in')))
    }, 270)
  }, [])

  useEffect(() => {
    const id = setInterval(() => goTo((idx + 1) % REVIEWS.length), INTERVAL)
    return () => clearInterval(id)
  }, [idx, goTo])

  const review = REVIEWS[idx]

  return (
    <div className="relative bg-brand-surface border border-brand-border p-10 lg:p-12 overflow-hidden">
      {/* Animated review content */}
      <div className={PHASE_CLASSES[phase]}>
        {/* Quote count tag */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-brand-gold text-sm tracking-widest" aria-label="5 estrelas">★★★★★</span>
          <span className="text-brand-muted text-xs tabular-nums">
            {String(idx + 1).padStart(2, '0')} / {String(REVIEWS.length).padStart(2, '0')}
          </span>
        </div>

        <p className="font-display text-2xl lg:text-3xl text-brand-stone/40 leading-relaxed italic mb-8">
          &ldquo;{review.text}&rdquo;
        </p>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center flex-shrink-0">
            <span className="text-brand-gold font-display font-bold text-sm">{review.initials}</span>
          </div>
          <div>
            <p className="text-brand-stone text-sm font-medium">{review.author}</p>
            <p className="text-brand-muted text-xs">{review.meta}</p>
          </div>
        </div>
      </div>

      {/* Clickable dot indicators */}
      <div className="flex gap-2 mt-8">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Review de ${REVIEWS[i].author}`}
            className={`h-0.5 transition-all duration-300 ${
              i === idx ? 'bg-brand-gold w-7' : 'bg-brand-border w-3 hover:bg-brand-muted'
            }`}
          />
        ))}
      </div>

      {/* Progress bar at the bottom — resets on idx change via key */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-border overflow-hidden">
        <div
          key={idx}
          className="h-full bg-brand-gold animate-fill-bar motion-reduce:w-full"
        />
      </div>
    </div>
  )
}
