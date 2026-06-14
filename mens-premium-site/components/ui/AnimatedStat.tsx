'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedStatProps {
  value: string   // e.g. "5+", "500+", "4.9★", "100%"
  label: string
  sub:   string
}

function parse(val: string) {
  const match = val.match(/^([\d.]+)(.*)$/)
  if (!match) return { num: 0, suffix: val, decimals: 0 }
  return {
    num:      parseFloat(match[1]),
    suffix:   match[2],
    decimals: match[1].includes('.') ? 1 : 0,
  }
}

export function AnimatedStat({ value, label, sub }: AnimatedStatProps) {
  const ref            = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState('0')
  const { num, suffix, decimals } = parse(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        if (reduced) {
          setDisplay(decimals > 0 ? num.toFixed(1) : String(num))
          return
        }

        const duration = 1600
        const startTime = performance.now()

        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1)
          const eased    = 1 - Math.pow(1 - progress, 3) // ease-out cubic
          const current  = num * eased

          setDisplay(decimals > 0 ? current.toFixed(1) : String(Math.floor(current)))

          if (progress < 1) requestAnimationFrame(tick)
          else setDisplay(decimals > 0 ? num.toFixed(1) : String(num))
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [num, decimals])

  return (
    <div
      ref={ref}
      className="bg-brand-dark p-8 lg:p-10 text-center group hover:bg-brand-surface transition-colors duration-200"
    >
      <p className="font-display text-4xl lg:text-5xl text-brand-gold mb-2 tabular-nums">
        {display}{suffix}
      </p>
      <p className="text-brand-stone text-sm font-medium tracking-wide mb-1">{label}</p>
      <p className="text-brand-muted text-xs">{sub}</p>
    </div>
  )
}
