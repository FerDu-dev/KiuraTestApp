import create from 'zustand';

// Estado inicial
const initialState = {
  products: [],
  cart: [],
};

// Acciones para manipular el estado
const actions = (set) => ({
  setProducts: (products) => set((state) => ({ ...state, products })),
  addToCart: (product) => set((state) => ({ ...state, cart: [...state.cart, product] })),
  removeFromCart: (productId) => set((state) => ({ ...state, cart: state.cart.filter((product) => product.id !== productId) })),
});

// Crear el store con Zustand
export const useStore = create(() => ({ ...initialState, ...actions }));
