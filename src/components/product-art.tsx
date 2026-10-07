import type { Product } from '@/data/products';
export function ProductArt({product}: {product: Product}) {
  return <div className="product-art">{product.image ? <img src={product.image} alt={product.description} loading="lazy" width={600} height={750}/> : <div className="missing-art"><strong>{product.id.slice(-2)}</strong><span>{product.category}</span></div>}</div>;
}