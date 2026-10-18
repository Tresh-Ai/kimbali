// Draft content for the founder to revise. No prices, timelines or guarantees.
import siteData from './data.json';
import productData from './product.json';
import { resolveImage } from '@/lib/image-source';

export const archiveGroups = siteData.archive.groups;
const groupMap = siteData.archive.groupMap as Record<string, string>;
export const groupFor = (category: string) => groupMap[category] ?? 'Other';

export const sets = productData.complimentary.map(set => ({
  ...set,
  image: resolveImage(set.image) ?? '',
  images: (set.images ?? []).map(img => resolveImage(img)).filter((x): x is string => !!x),
}));

export const businessUses = siteData.business.uses.map(use => ({ ...use, image: resolveImage(use.image) ?? '' }));
