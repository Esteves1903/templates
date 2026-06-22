import ProductDetailContent from '@/components/pages/ProductDetailContent';

export const metadata = { title: 'Produto — AutoPeças' };

export default function ProductPage({ params }) {
  return <ProductDetailContent id={params.id} />;
}
