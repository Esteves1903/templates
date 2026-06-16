interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const s = { sm: [16, 23, 'text-lg'], md: [20, 28, 'text-xl'], lg: [26, 37, 'text-3xl'] }[size] as [number, number, string];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <svg width={s[0]} height={s[1]} viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Outer flame body */}
        <path
          d="M10 27C4 23 0.5 15.5 2.5 9C4 4.5 7.5 1.5 6 0C10.5 3.5 8.5 11 13 14C15.5 9.5 13 2 17.5 0C21 7 18.5 17 20 22C16.5 16 13 23 10 27Z"
          fill="#ea580c"
        />
        {/* Inner hot core */}
        <path
          d="M10 27C7 22.5 5.5 18 7.5 13.5C9 10 11 8.5 10 6.5C13.5 9.5 11.5 15.5 14 18.5C15.5 15 13.5 10.5 16 8C17.5 13 16 19.5 17.5 23C15 18.5 12.5 23 10 27Z"
          fill="#fbbf24"
          opacity="0.65"
        />
      </svg>
      <span className={`font-serif text-white tracking-wide leading-none ${s[2]}`}>
        O Brasinhas <span className="text-brand-500 italic">3</span>
      </span>
    </div>
  );
}
