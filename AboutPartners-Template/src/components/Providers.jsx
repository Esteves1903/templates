'use client';

import { CartProvider } from '@/context/CartContext';
import { VehicleProvider } from '@/context/VehicleContext';

export default function Providers({ children }) {
  return (
    <VehicleProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </VehicleProvider>
  );
}
