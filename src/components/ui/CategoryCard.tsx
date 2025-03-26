
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
      className="category-tab flex flex-col items-center animate-fade-in"
    >
      <div className="w-14 h-14 rounded-full bg-white overflow-hidden shadow mb-1">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <span className="text-xs font-medium text-gray-700">{category.name}</span>
    </Link>
  );
};

export default CategoryCard;
