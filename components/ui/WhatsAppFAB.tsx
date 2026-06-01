'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { PROJECT_DATA } from '@/lib/constants';

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
      className="fab-anchor fab-anchor-right group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl sm:h-16 sm:w-16"
    >
      <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 group-hover:animate-pulse" />
      <MessageCircle size={26} className="relative z-10 sm:size-7" />
    </button>
  );
}
