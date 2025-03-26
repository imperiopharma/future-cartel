
import React, { useState, useEffect } from 'react';
import { Product } from '@/context/CartContext';
import { api } from '@/services/api';
import { toast } from 'sonner';

interface AdminProductFormProps {
  product?: Product;
  onSave: () => void;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({ product, onSave }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load categories
    const loadCategories = async () => {
      const data = await api.getCategories();
      setCategories(data);
    };

    loadCategories();

    // Initialize form if editing a product
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image: product.image,
        category: product.category,
      });
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price || !formData.image || !formData.category) {
      toast.error('Please fill in all required fields.');
      return;
    }
    
    setLoading(true);
    
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image,
        category: formData.category,
      };
      
      if (product) {
        // Update existing product
        await api.adminUpdateProduct(product.id, productData);
        toast.success('Product updated successfully!');
      } else {
        // Create new product
        await api.adminCreateProduct(productData);
        toast.success('Product created successfully!');
      }
      
      onSave();
      
      // Reset form if creating a new product
      if (!product) {
        setFormData({
          name: '',
          description: '',
          price: '',
          image: '',
          category: '',
        });
      }
    } catch (error) {
      toast.error('Error saving product. Please try again.');
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass p-6 rounded-2xl space-y-4 max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">
        {product ? 'Edit Product' : 'Add New Product'}
      </h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="input-field"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          className="input-field resize-none"
          required
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium mb-1">
          Price ($)
        </label>
        <input
          id="price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          min="0"
          step="0.01"
          className="input-field"
          required
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-1">
          Image URL
        </label>
        <input
          id="image"
          type="url"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          className="input-field"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="input-field"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {formData.image && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Image Preview:</p>
          <div className="h-48 w-full rounded-lg overflow-hidden bg-secondary/30">
            <img
              src={formData.image}
              alt="Product preview"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Error';
              }}
            />
          </div>
        </div>
      )}

      <div className="pt-4 flex justify-end space-x-2">
        <button
          type="button"
          onClick={onSave}
          className="primary-button"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="accent-button"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            `${product ? 'Update' : 'Create'} Product`
          )}
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;
