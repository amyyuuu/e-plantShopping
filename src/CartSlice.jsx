import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    cartCount: 0
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, description, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({
          name,
          image,
          description,
          cost,
          quantity: 1
        });
      }
      state.cartCount = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    removeItem: (state, action) => {
      const removedItem = state.items.find(item => item.name === action.payload.name);
      if (removedItem) {
        state.cartCount -= removedItem.quantity;
      }
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },
    
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        const oldQuantity = item.quantity;
        item.quantity = Math.max(0, quantity);
        state.cartCount += (item.quantity - oldQuantity);
        
        if (item.quantity === 0) {
          state.items = state.items.filter(i => i.name !== name);
        }
      }
    },
    
    updateCartCount: (state, action) => {
      state.cartCount = action.payload;
    }
  }
});

export const { addItem, removeItem, updateQuantity, updateCartCount } = CartSlice.actions;
export default CartSlice.reducer;