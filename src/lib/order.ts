import { studio } from '@/data/studio';
export interface BagItem {
  key: string; productId?: string | undefined; productSlug?: string | undefined; name: string; quantity: number;
  material: string; otherMaterial: string; color: string; customColor: string;
  hardware: string; customization: string; description: string; notes: string;
  referenceName: string; referenceData?: string | undefined; custom: boolean;
}
export function generateOrder(items: BagItem[]) {
  return `Hello KÍMBÀLÌ,\n\nI'd like to place an order.\n\n${items.map((item,index) => [
    `${index + 1}. ${item.name}${item.productId ? ` (${item.productId})` : ''}`,
    `Quantity: ${item.quantity}`, `Material request: ${item.material}${item.otherMaterial ? ` — ${item.otherMaterial}` : ''}`,
    `Color request: ${item.color}${item.customColor ? ` — ${item.customColor}` : ''}`,
    item.hardware && `Hardware request: ${item.hardware}`,
    item.customization && `Customization: ${item.customization}`,
    item.description && `Design description: ${item.description}`,
    item.notes && `Notes: ${item.notes}`,
  ].filter(Boolean).join('\n')).join('\n\n')}\n\nPlease confirm the available options, pricing and next steps. Thank you.`;
}
export function whatsappUrl(message: string, number = studio.whatsappNumber) {
  const raw = number.replace(/[^0-9]/g, '');
  const digits = /^0\d{10}$/.test(raw) ? `234${raw.slice(1)}` : raw;
  return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : null;
}