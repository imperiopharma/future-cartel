
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    image: string;
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/products?category=${category.name}`} 
      className="category-card animate-fade-in"
    >
      <div className="relative overflow-hidden">
        <img 
          src={category.image} 
          alt={category.name} 
          className="category-card-img"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-semibold">{category.name}</h3>
          <p className="text-sm text-white/80">Explore collection</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
