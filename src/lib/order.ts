import { studio } from '@/data/studio';
export interface BagItem {
  key: string; productId?: string; productSlug?: string; name: string; quantity: number;
  material: string; otherMaterial: string; color: string; customColor: string;
  hardware: string; customization: string; description: string; notes: string;
  referenceName: string; referenceData?: string; custom: boolean;
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
    item.referenceName && `Reference image: ${item.referenceName} (I will attach this separately in our conversation.)`,
  ].filter(Boolean).join('\n')).join('\n\n')}\n\nPlease confirm the available options, pricing and next steps. Thank you.`;
}
export function whatsappUrl(message: string, number = studio.whatsappNumber) {
  const digits = number.replace(/[^0-9]/g, '');
  return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : null;
}