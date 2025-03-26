
import React from 'react';

interface PromoHeaderProps {
  categoryFilter: string | null;
}

const PromoHeader: React.FC<PromoHeaderProps> = ({ categoryFilter }) => {
  const FireIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2C10.3683 4.15879 9.2373 6.0254 8.61035 7.6C7.97021 9.21732 7.79156 10.5967 8.07452 11.738C8.35747 12.8793 9.13287 13.7837 10.4007 14.451C9.44572 15.0479 8.85302 15.6859 8.62109 16.365C8.38917 17.0441 8.51437 17.7479 8.99609 18.477C9.50264 19.2518 10.3836 19.8885 11.6396 20.387C11.4374 19.0174 11.581 17.9809 12.0703 17.278C12.5585 16.5766 13.291 16.2466 14.2676 16.288C15.2443 16.3293 16.3001 16.7559 17.4355 17.568C17.6976 16.0383 17.4525 14.7231 16.7012 13.623C15.9498 12.5228 14.6847 11.5205 12.9062 10.617C13.7274 10.0388 14.2599 9.41338 14.5039 8.74C14.7479 8.06662 14.7718 7.38088 14.5762 6.6828C14.3805 5.98472 13.9811 5.29244 13.3789 4.6049C12.7778 3.91907 12.0351 3.05371 11.1504 2C11.2718 3.10214 11.1949 4.03238 10.9199 4.7947C10.6449 5.55703 10.1882 6.1711 9.54951 6.6377C8.91083 7.10431 8.11475 7.46241 7.16029 7.713C7.80225 5.8031 9.28376 3.9653 11.5947 2.1997L12 2Z" fill="currentColor"/>
    </svg>
  );

  return (
    <div className="px-4 py-2">
      <div className="flex items-center space-x-2">
        <FireIcon className="text-[hsl(var(--promotion-yellow))]" size={20} />
        <span className="font-medium text-[hsl(var(--promotion-yellow))]">
          {categoryFilter ? `${categoryFilter} (PROMOÇÃO)` : "Oferta Relâmpago"}
        </span>
      </div>
    </div>
  );
};

export default PromoHeader;
