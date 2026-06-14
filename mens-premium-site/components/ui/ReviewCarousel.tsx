'use client'

import { useState, useEffect } from 'react'

const REVIEWS = [
  {
    id:       1,
    initials: 'AS',
    author:   'A. Silva',
    meta:     'Guia Local, Google',
    text:     'Atendimento muito bom. Sempre focado no cliente. Só por marcação, sem esperas.',
  },
  {
    id:       2,
    initials: 'JS',
    author:   'José Silva',
    meta:     'Guia Local, 153 críticas',
    text:     'Ótimo atendimento por parte do Simão. Corta muito bem o cabelo. Recomendo.',
  },
  {
    id:       3,
    initials: 'MB',
    author:   'Manuel Barbosa',
    meta:     'Guia Local, 47 críticas',
    text:     'Excelentes profissionais!!',
  },
  {
    id:       4,
    initials: 'PS',
    author:   'Pedro S.',
    meta:     'Cliente, Google',
    text:     'Segunda vez que levo o meu filho de 11 anos, simplesmente fantástico.',
  },
]

/*
 * Card deck positions:
 *  0 = front (fully visible)
 *  1 = 2nd (slightly behind-right, half opacity)
 *  2 = 3rd (more behind-right, faint)
 *  3 = hidden (same position as 3rd but opacity 0 — exit target)
 */
const POSITIONS = [
  { x: 0,  y: 0,   rot: 0,   scale: 1,    opacity: 1    },
  { x: 14, y: -14, rot: 2.5, scale: 0.96, opacity: 0.48 },
  { x: 28, y: -28, rot: 5,   scale: 0.92, opacity: 0.22 },
  { x: 28, y: -28, rot: 5,   scale: 0.92, opacity: 0    }, // exit
]

export function ReviewCarousel() {
  const [active, setActive] = useState(0)
  const n = REVIEWS.length

  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % n), 4500)
    return () => clearInterval(id)
  }, [n])

  return (
    <div className="relative w-[300px] h-[280px]">
      {REVIEWS.map((review, i) => {
        const pos     = (i - active + n) % n
        const p       = POSITIONS[pos] ?? POSITIONS[3]
        const isFront = pos === 0

        return (
          <div
            key={review.id}
            aria-hidden={!isFront}
            style={{
              zIndex:      POSITIONS.length - pos,
              transform:  `translateX(${p.x}px) translateY(${p.y}px) rotate(${p.rot}deg) scale(${p.scale})`,
              opacity:     p.opacity,
              transition: 'transform 700ms cubic-bezier(0.4,0,0.2,1), opacity 600ms ease',
            }}
            className={`absolute inset-0 bg-brand-dark border border-brand-border p-7 flex flex-col ${
              isFront ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            {/* Inner corner accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-brand-gold/50" aria-hidden="true" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-brand-gold/50" aria-hidden="true" />

            {/* Stars */}
            <div className="flex gap-0.5 mb-4" aria-label="5 estrelas">
              {[1, 2, 3, 4, 5].map(s => (
                <span key={s} className="text-brand-gold text-sm" aria-hidden="true">★</span>
              ))}
            </div>

            {/* Faint rating in background */}
            <p
              className="font-display leading-none pointer-events-none select-none -mt-1 -mb-9 text-[5rem] text-brand-gold/[0.06]"
              aria-hidden="true"
            >
              4.9
            </p>

            {/* Quote */}
            <blockquote className="flex-1">
              <p className="font-display italic text-brand-stone/85 leading-relaxed line-clamp-3 mb-5 text-[0.95rem]">
                &ldquo;{review.text}&rdquo;
              </p>
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-brand-border">
              <div className="w-9 h-9 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center flex-shrink-0">
                <span className="text-brand-gold font-bold text-xs font-sans">{review.initials}</span>
              </div>
              <div>
                <p className="text-brand-stone text-sm font-medium">{review.author}</p>
                <p className="text-brand-muted text-xs">{review.meta}</p>
              </div>
            </div>
          </div>
        )
      })}

      {/* Progress dots */}
      <div className="absolute left-0 flex gap-2 bottom-[-28px]">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Ver avaliação ${i + 1}`}
            className={`h-[2px] transition-all duration-[400ms] ease border-none p-0 cursor-pointer ${
              i === active ? 'w-[22px] bg-brand-gold' : 'w-[8px] bg-brand-border'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
