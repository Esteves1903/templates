import { Suspense } from 'react';
import CatalogContent from '@/components/pages/CatalogContent';

export const metadata = { title: 'Catálogo — AutoPeças' };

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20 text-slate-500">A carregar catálogo…</div>}>
      <CatalogContent />
    </Suspense>
  );
}
