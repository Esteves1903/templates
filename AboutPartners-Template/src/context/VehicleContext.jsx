'use client';

import { createContext, useContext, useState } from 'react';

const VehicleContext = createContext(null);

export function VehicleProvider({ children }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const clearVehicle = () => setSelectedVehicle(null);
  return (
    <VehicleContext.Provider value={{ selectedVehicle, setSelectedVehicle, clearVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicle() {
  const ctx = useContext(VehicleContext);
  if (!ctx) throw new Error('useVehicle must be inside VehicleProvider');
  return ctx;
}
