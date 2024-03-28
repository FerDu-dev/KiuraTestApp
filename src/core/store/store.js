import { create } from 'zustand';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../api/api';

export const useStore = create((set) => ({
  products: [],
  cart: [],
  loadProducts: async () => {
    const data = await fetchProducts();
    set({ products: data.products });
  },
  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
  removeFromCart: (productId) => set((state) => ({ cart: state.cart.filter((product) => product.id !== productId) })),

  loadCategories: async () => {
    const data = await fetchCategories();
    set({ categories: data });
  },
  loadProductsByCategory: async (category) => {
    const data = await fetchProductsByCategory(category);
    set({ products: data.products });
  },  
}));

export default useStore;