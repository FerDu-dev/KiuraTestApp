import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cartItems: [],
  cartCount: 0,

  addItemToCart: (item) => {
    const itemExists = get().cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (itemExists) {
      if (typeof itemExists.quantity === "number" && itemExists.quantity < itemExists.stock) {
        itemExists.quantity++;
      }
    } else {
      set({ cartItems: [...get().cartItems, { ...item, quantity: 1 }] });
    }

    set({ cartCount: get().cartItems.length });
  },

  removeItemFromCart: (itemId) => {
    set({
      cartItems: get().cartItems.filter((item) => item.id !== itemId),
    });

    set({ cartCount: get().cartItems.length });
  },

  increaseQuantity: (itemId) => {
    const item = get().cartItems.find((item) => item.id === itemId);

    if (item && typeof item.quantity === "number" && item.quantity < item.stock) {
      item.quantity++;
    }

    set({ cartItems: [...get().cartItems] });
  },

  decreaseQuantity: (itemId) => {
    const item = get().cartItems.find((item) => item.id === itemId);

    if (item && typeof item.quantity === "number" && item.quantity > 1) {
      item.quantity--;
    }

    set({ cartItems: [...get().cartItems] });
  },

  getTotal: () => {
    return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  clearCart: () => set({ cartItems: [], cartCount: 0 }),

    
  

}));

export default useCartStore;
