import siteData from './data.json';
import atelierEditorial from '@/assets/atelier-editorial.jpg';
import materialEditorial from '@/assets/material-editorial.jpg';
import toteStudy from '@/assets/tote-study.jpg';
import messengerStudy from '@/assets/messenger-study.jpg';
import leatherStudy from '@/assets/leather-study.jpg';

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

const assetMap: Record<string, string> = {
  '@/assets/atelier-editorial.jpg': atelierEditorial,
  '@/assets/material-editorial.jpg': materialEditorial,
  '@/assets/tote-study.jpg': toteStudy,
  '@/assets/messenger-study.jpg': messengerStudy,
  '@/assets/leather-study.jpg': leatherStudy,
};

interface ReferenceItem {
  name: string;
  category: string;
  description: string;
  image?: string;
  images?: string[];
}

const references = siteData.references as unknown as ReferenceItem[];

export const products: Product[] = references.map((item, index) => {
  const resolvedImage = item.image && assetMap[item.image] ? assetMap[item.image] : null;
  const resolvedImages = item.images ? item.images.map(img => assetMap[img] || img) : [];

  return {
    id: `KMB-${String(index + 1).padStart(2, '0')}`,
    name: item.name,
    category: item.category,
    description: item.description,
    slug: `${String(index + 1).padStart(2, '0')}-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    image: resolvedImage ?? null,
    images: resolvedImages,
    materials: [index === 16 ? 'Ostrich leather' : 'Leather'],
    colors:
      index === 1
        ? ['Tan', 'White']
        : index === 4
          ? ['Cream']
          : index === 12
            ? ['Orange']
            : item.description.toLowerCase().includes('brown')
              ? ['Brown']
              : [],
    hardwareOptions: [],
    customizable: true,
    notes: 'Material, colour and detail requests are confirmed with the studio before an order is agreed.',
    availability: 'Enquire with the studio',
  };
});
