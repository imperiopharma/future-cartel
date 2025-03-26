
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { api } from '@/services/api';
import { useCart, Product } from '@/context/CartContext';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        if (!id) return;
        
        const productData = await api.getProduct(Number(id));
        
        if (productData) {
          setProduct(productData);
          
          // Load related products (same category)
          const allProducts = await api.getProducts();
          const related = allProducts
            .filter(p => p.category === productData.category && p.id !== productData.id)
            .slice(0, 4);
          
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      
      toast.success(`${product.name} added to cart`, {
        description: `${quantity} item${quantity > 1 ? 's' : ''} added to your cart`,
        action: {
          label: 'View Cart',
          onClick: () => window.location.href = '/cart'
        }
      });
    }
  };

  // Skeleton loader
  const ProductDetailSkeleton = () => (
    <div className="animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="aspect-square bg-secondary/50 rounded-2xl"></div>
        </div>
        <div className="md:w-1/2 space-y-4">
          <div className="h-7 bg-secondary/50 rounded w-3/4"></div>
          <div className="h-5 bg-secondary/50 rounded w-1/4"></div>
          <div className="h-5 bg-secondary/50 rounded w-1/3 mt-6"></div>
          <div className="space-y-2">
            <div className="h-4 bg-secondary/50 rounded w-full"></div>
            <div className="h-4 bg-secondary/50 rounded w-full"></div>
            <div className="h-4 bg-secondary/50 rounded w-2/3"></div>
          </div>
          <div className="pt-6 space-y-4">
            <div className="h-12 bg-secondary/50 rounded"></div>
            <div className="h-12 bg-secondary/50 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-20 px-4">
          <div className="container mx-auto">
            <ProductDetailSkeleton />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find the product you're looking for.
            </p>
            <Link to="/products" className="primary-button inline-flex">
              <ChevronLeft size={16} className="mr-2" /> Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                Products
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <Link
                to={`/products?category=${product.category}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {product.category}
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-primary truncate">{product.name}</span>
            </nav>
          </div>

          {/* Product Detail */}
          <div className="glass p-6 rounded-2xl mb-12 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Product Image */}
              <div className="lg:w-1/2">
                <div className="rounded-2xl overflow-hidden bg-white/5 aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              {/* Product Info */}
              <div className="lg:w-1/2 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
                    <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                      {product.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">(24 reviews)</span>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
                
                {/* Quantity Selector */}
                <div>
                  <h3 className="font-medium mb-3">Quantity</h3>
                  <div className="flex items-center border border-border rounded-lg overflow-hidden w-32">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-secondary/50 transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-12 h-10 text-center bg-transparent border-0 focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-secondary/50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={handleAddToCart}
                    className="accent-button sm:flex-1"
                  >
                    <ShoppingCart size={18} className="mr-2" /> Add to Cart
                  </button>
                  <button className="primary-button">
                    <Heart size={18} className="mr-2" /> Wishlist
                  </button>
                  <button className="primary-button sm:w-12 flex-shrink-0">
                    <Share2 size={18} />
                  </button>
                </div>
                
                {/* Features */}
                <div className="pt-4 space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                    <span>Secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="product-grid">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
