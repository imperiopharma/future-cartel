
import React from 'react';
import { BadgePercent, FlameIcon, Clock } from 'lucide-react';

interface PromoHeaderProps {
  categoryFilter: string | null;
}

const PromoHeader: React.FC<PromoHeaderProps> = ({ categoryFilter }) => {
  return (
    <div className="px-4 py-3 bg-gradient-to-r from-yellow-500/10 to-amber-500/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BadgePercent className="text-[hsl(var(--promotion-yellow))]" size={18} />
          <span className="font-medium text-[hsl(var(--promotion-yellow))]">
            {categoryFilter ? `${categoryFilter} em promoção` : "Ofertas do dia"}
          </span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Clock size={14} className="mr-1" />
          <span>Termina em 2h</span>
        </div>
      </div>
      
      <div className="mt-2 overflow-x-auto flex gap-2 pb-1 scrollbar-thin">
        <div className="flex-shrink-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 px-3 py-1 rounded-full text-sm font-medium text-orange-600 border border-orange-200">
          <span>Até 40% OFF</span>
        </div>
        <div className="flex-shrink-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-3 py-1 rounded-full text-sm font-medium text-blue-600 border border-blue-200">
          <span>Frete Grátis</span>
        </div>
        <div className="flex-shrink-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 px-3 py-1 rounded-full text-sm font-medium text-green-600 border border-green-200">
          <span>Compre 1 Leve 2</span>
        </div>
      </div>
    </div>
  );
};

export default PromoHeader;
