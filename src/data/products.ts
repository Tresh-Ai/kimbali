import productData from './product.json';
import { resolveImage } from '@/lib/image-source';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  images: string[];
  category: string;
  materials: string[];
  colors: string[];
  hardwareOptions: string[];
  customizable: boolean;
  notes: string;
  availability: string;
}

interface ReferenceItem {
  name: string;
  category: string;
  description: string;
  image?: string;
  images?: string[];
  materials?: string[];
  colors?: string[];
}

const references = productData.archive as ReferenceItem[];

export const products: Product[] = references.map((item, index) => {
  const n = String(index + 1).padStart(2, '0');
  return {
    id: `KMB-${n}`,
    name: item.name,
    category: item.category,
    description: item.description,
    slug: `${n}-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    image: resolveImage(item.image),
    images: (item.images ?? []).map(img => resolveImage(img)).filter((x): x is string => !!x),
    materials: item.materials ?? ['Leather'],
    colors: item.colors ?? (item.description.toLowerCase().includes('brown') ? ['Brown'] : []),
    hardwareOptions: [],
    customizable: true,
    notes: 'Material, colour and detail requests are confirmed with the studio before an order is agreed.',
    availability: 'Enquire with the studio',
  };
});
