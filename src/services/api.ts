
// Simulated API service
import { Product } from '../context/CartContext';

// Mock data for products
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear audio with our premium wireless headphones. Featuring noise cancellation, 30-hour battery life, and ergonomic design for all-day comfort.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    description: "Stay connected with our latest smartwatch. Track your fitness, receive notifications, and more with a beautiful OLED display and 5-day battery life.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Gourmet Coffee Set",
    description: "Start your day right with our premium coffee set. Includes artisanal beans from around the world and a handcrafted ceramic pour-over set.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Food"
  },
  {
    id: 4,
    name: "Designer Minimalist Lamp",
    description: "Add elegance to any room with our minimalist designer lamp. Features adjustable brightness, wireless charging pad, and premium materials.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1507394650679-e325fc1ee83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Home"
  },
  {
    id: 5,
    name: "Premium Yoga Mat",
    description: "Elevate your practice with our eco-friendly, non-slip yoga mat. Perfect for all types of yoga and fitness routines.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Fitness"
  },
  {
    id: 6,
    name: "Artisanal Chocolate Box",
    description: "Indulge in our handcrafted chocolate selection. Each piece is made with organic, fair-trade ingredients and unique flavor combinations.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1526081347589-7fa3cb16a4b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Food"
  },
  {
    id: 7,
    name: "Modern Desk Organizer",
    description: "Keep your workspace tidy with our sleek, modern desk organizer. Features compartments for all your essentials and wireless charging pad.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Home"
  },
  {
    id: 8,
    name: "Premium Water Bottle",
    description: "Stay hydrated in style with our insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Fitness"
  }
];

// Mock categories
const mockCategories = [
  { id: 1, name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
  { id: 2, name: "Food", image: "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
  { id: 3, name: "Home", image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
  { id: 4, name: "Fitness", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" }
];

// Mock orders storage
let mockOrders: any[] = [];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API methods
export const api = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    await delay(500); // Simulate network delay
    return [...mockProducts];
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    await delay(500);
    return mockProducts.filter(product => product.category === category);
  },

  // Get a single product by ID
  getProduct: async (id: number): Promise<Product | undefined> => {
    await delay(300);
    return mockProducts.find(product => product.id === id);
  },

  // Get all categories
  getCategories: async () => {
    await delay(400);
    return [...mockCategories];
  },

  // Create a new order
  createOrder: async (orderData: any) => {
    await delay(800);
    const newOrder = {
      id: Date.now(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    mockOrders.push(newOrder);
    return newOrder;
  },

  // Admin: Get all products
  adminGetProducts: async (): Promise<Product[]> => {
    await delay(500);
    return [...mockProducts];
  },

  // Admin: Create product
  adminCreateProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
    await delay(700);
    const newProduct = {
      id: Math.max(...mockProducts.map(p => p.id), 0) + 1,
      ...productData
    };
    mockProducts.push(newProduct);
    return newProduct;
  },

  // Admin: Update product
  adminUpdateProduct: async (id: number, productData: Partial<Product>): Promise<Product | undefined> => {
    await delay(700);
    const index = mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProducts[index] = { ...mockProducts[index], ...productData };
      return mockProducts[index];
    }
    return undefined;
  },

  // Admin: Delete product
  adminDeleteProduct: async (id: number): Promise<boolean> => {
    await delay(700);
    const initialLength = mockProducts.length;
    // Find the index of the product to delete
    const index = mockProducts.findIndex(p => p.id === id);
    
    // If product exists, remove it using splice (modifies the array in place)
    if (index !== -1) {
      mockProducts.splice(index, 1);
    }
    
    return initialLength > mockProducts.length;
  },

  // Get featured products
  getFeaturedProducts: async (): Promise<Product[]> => {
    await delay(500);
    // Return 4 random products as featured
    const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }
};
