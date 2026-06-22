import { Star } from 'lucide-react';

export default function StarRating({ rating, count, className = '' }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {[1,2,3,4,5].map(n => (
          <Star
            key={n}
            className={`w-3.5 h-3.5 ${n <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
          />
        ))}
      </div>
      {count != null && <span className="text-xs text-slate-500">({count})</span>}
    </div>
  );
}
