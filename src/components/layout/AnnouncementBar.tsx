import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

const MESSAGES = [
  'Discover something different.',
  'Unique 3D-printed designs.',
  'Made with care, one print at a time.',
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="relative bg-[#11111A] border-b border-[#232334] text-xs py-2 px-4 select-none z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length)}
            className="text-[#B8B8C8] hover:text-white transition-colors p-0.5 rounded cursor-pointer"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % MESSAGES.length)}
            className="text-[#B8B8C8] hover:text-white transition-colors p-0.5 rounded cursor-pointer"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex-1 text-center font-medium tracking-wide text-white/90 px-4 transition-all duration-300">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] shrink-0" />
            <span>{MESSAGES[currentIndex]}</span>
          </span>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-[#B8B8C8] hover:text-white transition-colors p-0.5 rounded cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
