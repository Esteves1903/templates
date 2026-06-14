import { type ButtonHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'gold' | 'outline-gold' | 'ghost' | 'destructive'
type Size    = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 uppercase font-medium tracking-widest ' +
  'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black ' +
  'disabled:pointer-events-none disabled:opacity-40'

const variantStyles: Record<Variant, string> = {
  gold:           'bg-brand-gold text-brand-black hover:bg-brand-gold-light focus-visible:ring-brand-gold',
  'outline-gold': 'border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black focus-visible:ring-brand-gold',
  ghost:          'text-brand-muted hover:text-brand-gold focus-visible:ring-brand-border',
  destructive:    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
}

const sizeStyles: Record<Size, string> = {
  sm: 'py-2   px-5  text-xs',
  md: 'py-3   px-7  text-sm',
  lg: 'py-3.5 px-10 text-sm',
}

export function buttonVariants({
  variant   = 'gold',
  size      = 'md',
  className = '',
}: {
  variant?:   Variant
  size?:      Size
  className?: string
} = {}) {
  return cn(base, variantStyles[variant], sizeStyles[size], className)
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   Variant
  size?:      Size
  isLoading?: boolean
  href?:      string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'gold', size = 'md', isLoading, disabled, className, href, children, ...props }, ref) => {
    const classes = buttonVariants({ variant, size, className })

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        className={classes}
        {...props}
      >
        {isLoading && (
          <span
            className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
