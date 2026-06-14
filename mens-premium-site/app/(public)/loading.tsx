export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center" aria-label="A carregar…">
      <div className="flex flex-col items-center gap-6">
        <div className="w-10 h-10 rounded-full border-2 border-brand-gold border-t-transparent animate-spin" />
        <span className="text-[10px] tracking-[0.5em] uppercase text-brand-muted font-sans">
          Exemplo
        </span>
      </div>
    </div>
  )
}
