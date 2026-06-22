'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car, ChevronDown, Check } from 'lucide-react';
import { vehicleMakes } from '@/data/mockData';
import { useVehicle } from '@/context/VehicleContext';
import Button from '@/components/ui/Button';

export default function VehicleSelector({ onSelect, compact = false }) {
  const { selectedVehicle, setSelectedVehicle } = useVehicle();
  const [makeId,  setMakeId]  = useState(selectedVehicle?.makeId  ?? '');
  const [modelId, setModelId] = useState(selectedVehicle?.modelId ?? '');
  const [year,    setYear]    = useState(selectedVehicle?.year     ?? '');
  const router = useRouter();

  const selectedMake  = vehicleMakes.find(m => m.id === makeId);
  const selectedModel = selectedMake?.models.find(m => m.id === modelId);

  const handleMakeChange  = (e) => { setMakeId(e.target.value);  setModelId(''); setYear(''); };
  const handleModelChange = (e) => { setModelId(e.target.value); setYear(''); };

  const handleConfirm = () => {
    if (!makeId || !modelId || !year) return;
    const vehicle = { makeId, makeName: selectedMake.name, modelId, modelName: selectedModel.name, year: Number(year) };
    setSelectedVehicle(vehicle);
    if (onSelect) { onSelect(vehicle); } else { router.push('/catalogo'); }
  };

  const selectClass = `
    w-full appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm
    text-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent
    disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed transition pr-8
  `;

  if (compact) return (
    <div className="flex flex-wrap gap-2 items-end">
      <SelectWrapper label="Marca">
        <select value={makeId} onChange={handleMakeChange} className={selectClass}>
          <option value="">Marca</option>
          {vehicleMakes.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </SelectWrapper>
      <SelectWrapper label="Modelo">
        <select value={modelId} onChange={handleModelChange} disabled={!makeId} className={selectClass}>
          <option value="">Modelo</option>
          {selectedMake?.models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </SelectWrapper>
      <SelectWrapper label="Ano">
        <select value={year} onChange={e => setYear(e.target.value)} disabled={!modelId} className={selectClass}>
          <option value="">Ano</option>
          {selectedModel?.years.slice().reverse().map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </SelectWrapper>
      <Button onClick={handleConfirm} disabled={!makeId || !modelId || !year} size="md">
        <Check className="w-4 h-4" /> Aplicar
      </Button>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 bg-[var(--color-accent-light)] rounded-lg flex items-center justify-center">
          <Car className="w-5 h-5 text-[var(--color-accent)]" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 text-sm">Selecionar veículo</h3>
          <p className="text-xs text-slate-500">Encontra peças compatíveis com o teu carro</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <SelectWrapper label="Marca">
          <select value={makeId} onChange={handleMakeChange} className={selectClass}>
            <option value="">Selecionar marca</option>
            {vehicleMakes.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </SelectWrapper>
        <SelectWrapper label="Modelo">
          <select value={modelId} onChange={handleModelChange} disabled={!makeId} className={selectClass}>
            <option value="">Selecionar modelo</option>
            {selectedMake?.models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </SelectWrapper>
        <SelectWrapper label="Ano">
          <select value={year} onChange={e => setYear(e.target.value)} disabled={!modelId} className={selectClass}>
            <option value="">Selecionar ano</option>
            {selectedModel?.years.slice().reverse().map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </SelectWrapper>
      </div>
      <Button onClick={handleConfirm} disabled={!makeId || !modelId || !year} fullWidth size="lg">
        <Car className="w-4 h-4" /> Ver peças compatíveis
      </Button>
    </div>
  );
}

function SelectWrapper({ label, children }) {
  return (
    <div className="relative">
      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      {children}
      <ChevronDown className="absolute right-2.5 bottom-3 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  );
}
