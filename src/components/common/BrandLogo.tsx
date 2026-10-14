import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official circular emblem with glow ring */}
      <div className={`relative shrink-0 ${sizeClasses[size]}`}>
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-[#00D9FF] via-[#792BFF] to-[#FF00D4] opacity-75 blur-xs group-hover:opacity-100 transition-opacity duration-300" />
        <img
          src="/src/assets/images/brand_logo_badge_1791921027825.jpg"
          alt="L&M 3D Print Store Official Logo"
          referrerPolicy="no-referrer"
          className="relative w-full h-full rounded-full object-cover shadow-lg border border-[#00D9FF]/40"
          onError={(e) => {
            // High-fidelity fallback badge if image fails
            const target = e.currentTarget;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.classList.add(
                'bg-[#08080D]',
                'border-2',
                'border-[#00D9FF]',
                'flex',
                'items-center',
                'justify-center'
              );
              parent.innerHTML =
                '<span class="font-extrabold text-xs tracking-tighter text-white"><span class="text-[#00D9FF]">L</span>&amp;<span class="text-[#FF00D4]">M</span></span>';
            }
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className={`font-display font-black tracking-tight text-white flex items-center gap-1.5 ${textClasses[size]}`}>
            <span className="text-[#00D9FF] drop-shadow-[0_2px_8px_rgba(0,217,255,0.4)]">L</span>
            <span className="text-white/90 text-[0.8em] font-bold">&amp;</span>
            <span className="text-[#FF00D4] drop-shadow-[0_2px_8px_rgba(255,0,212,0.4)]">M</span>
            <span className="text-white font-extrabold tracking-wide uppercase ml-1">3D PRINT</span>
          </div>
          <span className="text-[10px] tracking-[0.25em] text-[#B8B8C8] uppercase font-semibold mt-1">
            Store · UK Studio
          </span>
        </div>
      )}
    </div>
  );
};
