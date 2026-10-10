import { describe, expect, it } from 'vitest';
import { generateOrder, whatsappUrl, type BagItem } from '@/lib/order';

describe('Studio WhatsApp ordering', () => {
  it('uses the supplied Nigerian number as an international WhatsApp destination', () => {
    expect(whatsappUrl('Hello')).toBe('https://wa.me/2349138289542?text=Hello');
  });
  it('encodes the complete order without losing custom requests', () => {
    const message = 'Brown & white\nCustom colour: café';
    const url = whatsappUrl(message);
    expect(url && new URL(url).searchParams.get('text')).toBe(message);
  });
  it('does not ask for image attachments, including for older saved selections', () => {
    const item: BagItem = { key:'one', name:'Custom Tote', quantity:1, material:'Leather', otherMaterial:'', color:'Custom', customColor:'Green', hardware:'', customization:'', description:'A small tote', notes:'', referenceName:'old-reference.jpg', custom:true };
    const message = generateOrder([item]);
    expect(message).not.toContain('old-reference.jpg');
    expect(message.toLowerCase()).not.toContain('attach');
    expect(message).toContain('Color request: Custom — Green');
  });
});