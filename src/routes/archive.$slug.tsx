import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { products } from '@/data/products';
import { pageHead } from '@/lib/seo';
import { ProductArt } from '@/components/product-art';
import { ConfigurationForm } from '@/components/configuration-form';
import { useCart } from '@/lib/cart';
export const Route = createFileRoute('/archive/$slug')({
  validateSearch:(search:Record<string,unknown>): { edit?: string | undefined } => ({edit:typeof search['edit'] === 'string' ? search['edit'] : undefined}),
  loader:({params}) => {const product = products.find(p => p.slug === params.slug); if (!product) throw notFound(); return product;},
  head:({loaderData}) => pageHead(loaderData?.name || 'Reference not found',loaderData?.description || 'This archive reference is unavailable.'),
  component:ProductDetail,
});
function ProductDetail() {
  const product = Route.useLoaderData(); const {edit} = Route.useSearch(); const cart = useCart();
  const initial = edit ? cart.items.find(item => item.key === edit && item.productId === product.id) : undefined;
  return <div className="container page"><div className="breadcrumb"><Link to="/archive">The Archive</Link><span>/</span><span>{product.id}</span></div><div className="detail-grid"><div><ProductArt product={product}/></div><div><p className="eyebrow muted">{product.category} / {product.id}</p><h1>{product.name}</h1><p className="muted">{product.description}</p><ConfigurationForm product={product} initial={initial}/></div></div></div>;
}