
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryTabsProps {
  categories: any[];
  selectedCategory: string | null;
  loading: boolean;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selectedCategory, loading }) => {
  if (loading) {
    return (
      <div className="category-tabs">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="category-tab animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-20"></div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="category-tabs">
      <Link 
        to="/products" 
        className={`category-tab ${!selectedCategory ? 'active' : ''} flex flex-col items-center`}
      >
        <div className={`w-2 h-2 rounded-full mb-1 ${!selectedCategory ? 'bg-[hsl(var(--delivery-blue))]' : 'bg-transparent'}`}></div>
        Todos
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/products?category=${category.name}`}
          className={`category-tab ${selectedCategory === category.name ? 'active' : ''} flex flex-col items-center`}
        >
          <div className={`w-2 h-2 rounded-full mb-1 ${selectedCategory === category.name ? 'bg-[hsl(var(--delivery-blue))]' : 'bg-transparent'}`}></div>
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryTabs;
