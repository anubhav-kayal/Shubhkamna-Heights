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
    <div className="fixed bottom-8 right-8 z-40">
      <button
        onClick={handleWhatsAppClick}
        className="relative w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
      >
        {/* Pulse ring animation */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 group-hover:animate-pulse"></div>
        
        <MessageCircle size={28} className="relative z-10" />
      </button>
    </div>
  );
}
