'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { PROJECT_DATA } from '@/lib/constants';
import { cn } from '@/lib/cn';

export default function WhatsAppFAB() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(PROJECT_DATA.whatsappMessage);
    window.open(`https://wa.me/${PROJECT_DATA.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      type="button"
      onClick={handleWhatsAppClick}
      aria-label="Chat on WhatsApp"
      className={cn(
        'group fixed z-[48] flex h-14 w-14 items-center justify-center',
        'bg-[#25D366] text-white shadow-lg transition-transform duration-300',
        'hover:scale-105 hover:shadow-xl sm:h-16 sm:w-16',
        'right-[max(1rem,env(safe-area-inset-right,0px))]',
        'bottom-[calc(1rem+env(safe-area-inset-bottom,0px))]',
        'sm:right-[max(1.5rem,env(safe-area-inset-right,0px))]',
        'sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]',
      )}
    >
      <div className="absolute inset-0 bg-[#25D366] opacity-75 group-hover:animate-pulse" />
      <MessageCircle size={26} className="relative z-10 sm:size-7" />
    </button>
  );
}
