
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  ShoppingCart, 
  Package, 
  Search,
  Home,
  Users
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdminProductForm from '@/components/ui/AdminProductForm';
import { api } from '@/services/api';
import { Product } from '@/context/CartContext';
import { toast } from 'sonner';

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.adminGetProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.adminDeleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
        toast.success('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      }
    }
  };

  const handleFormClose = () => {
    setEditingProduct(null);
    setIsAddingProduct(false);
    loadProducts();
  };

  // Filter products by search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Admin Dashboard</h1>
            <div className="flex space-x-2">
              <Link to="/" className="primary-button">
                <Home size={16} className="mr-2" /> View Store
              </Link>
              <button
                onClick={() => {
                  setIsAddingProduct(true);
                  setEditingProduct(null);
                }}
                className="accent-button"
              >
                <Plus size={16} className="mr-2" /> Add Product
              </button>
            </div>
          </div>

          {/* Admin Tabs */}
          <div className="glass rounded-xl overflow-hidden mb-8">
            <div className="flex">
              <button className="py-3 px-6 border-b-2 border-primary font-medium text-primary flex items-center">
                <Package size={18} className="mr-2" /> Products
              </button>
              <button className="py-3 px-6 text-muted-foreground hover:text-foreground transition-colors flex items-center" disabled>
                <ShoppingCart size={18} className="mr-2" /> Orders
              </button>
              <button className="py-3 px-6 text-muted-foreground hover:text-foreground transition-colors flex items-center" disabled>
                <Users size={18} className="mr-2" /> Customers
              </button>
            </div>
          </div>

          {/* Product Form (Edit/Add) */}
          {(editingProduct || isAddingProduct) && (
            <div className="mb-8">
              <AdminProductForm
                product={editingProduct}
                onSave={handleFormClose}
              />
            </div>
          )}

          {/* Products List */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b border-border">
              <h2 className="text-xl font-semibold">Products</h2>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  className="input-field pl-9"
                />
              </div>
            </div>

            {loading ? (
              <div className="p-6 text-center">
                <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <p className="mt-2 text-muted-foreground">Loading products...</p>
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-muted-foreground">
                  {searchQuery ? 'No products match your search.' : 'No products available.'}
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary/30">
                      <tr>
                        <th className="py-3 px-4 text-left">Image</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Category</th>
                        <th className="py-3 px-4 text-right">Price</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {paginatedProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-secondary/10 transition-colors">
                          <td className="py-3 px-4">
                            <div className="w-12 h-12 rounded bg-secondary/30 overflow-hidden">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=Error';
                                }}
                              />
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium max-w-xs truncate">
                            {product.name}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-secondary rounded-full text-xs">
                              {product.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => {
                                  setEditingProduct(product);
                                  setIsAddingProduct(false);
                                }}
                                className="p-1 text-primary hover:bg-primary/10 rounded-full transition-colors"
                                aria-label="Edit product"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-1 text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                                aria-label="Delete product"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="p-4 border-t border-border flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Showing {(currentPage - 1) * productsPerPage + 1}-
                      {Math.min(currentPage * productsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-secondary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded-lg ${
                            page === currentPage
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-secondary/50 transition-colors'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-secondary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
