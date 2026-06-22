const variants = {
  accent:  'bg-[var(--color-accent)] text-white',
  red:     'bg-red-100 text-red-700',
  green:   'bg-green-100 text-green-700',
  yellow:  'bg-yellow-100 text-yellow-700',
  slate:   'bg-slate-100 text-slate-600',
  outline: 'border border-slate-200 text-slate-600',
};

export default function Badge({ children, variant = 'slate', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
