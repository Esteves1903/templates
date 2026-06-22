'use client';

import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const idx = state.items.findIndex(i => i.id === action.payload.id);
      if (idx >= 0) {
        const items = [...state.items];
        items[idx] = { ...items[idx], quantity: items[idx].quantity + (action.payload.quantity ?? 1) };
        return { ...state, items };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: action.payload.quantity ?? 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QTY': {
      if (action.payload.quantity <= 0) return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
      return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i) };
    }
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const addItem    = (product, qty = 1) => dispatch({ type: 'ADD_ITEM',    payload: { ...product, quantity: qty } });
  const removeItem = (id)               => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQty  = (id, quantity)     => dispatch({ type: 'UPDATE_QTY',  payload: { id, quantity } });
  const clearCart  = ()                 => dispatch({ type: 'CLEAR' });
  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
