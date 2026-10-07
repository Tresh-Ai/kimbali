import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { BagItem } from './order';
interface CartState { items: BagItem[]; ready: boolean; storageError: boolean; save: (item: BagItem) => void; remove: (key: string) => void; quantity: (key: string, value: number) => void; clear: () => void; }
const CartContext = createContext<CartState | null>(null);
const storageKey = 'kimbali-bag-v1';
function validItem(value: unknown): value is BagItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string,unknown>;
  return ['key','name','material','otherMaterial','color','customColor','hardware','customization','description','notes','referenceName'].every(k => typeof item[k] === 'string') && typeof item.custom === 'boolean' && typeof item.quantity === 'number' && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99;
}
export function CartProvider({ children }: { children: ReactNode }) {
  const [items,setItems] = useState<BagItem[]>([]);
  const [ready,setReady] = useState(false);
  const [storageError,setStorageError] = useState(false);
  useEffect(() => {
    try { const parsed: unknown = JSON.parse(localStorage.getItem(storageKey) || '[]'); if (Array.isArray(parsed)) setItems(parsed.filter(validItem)); }
    catch { setStorageError(true); }
    setReady(true);
  },[]);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(storageKey, JSON.stringify(items)); setStorageError(false); }
    catch { setStorageError(true); }
  },[items,ready]);
  const save = (item: BagItem) => setItems(current => current.some(i => i.key === item.key) ? current.map(i => i.key === item.key ? item : i) : [...current,item]);
  return <CartContext.Provider value={{items,ready,storageError,save,remove:key => setItems(current => current.filter(i => i.key !== key)),quantity:(key,value) => setItems(current => current.map(i => i.key === key ? {...i,quantity:Math.max(1,Math.min(99,value))} : i)),clear:() => setItems([])}}>{children}</CartContext.Provider>;
}
export function useCart() { const cart = useContext(CartContext); if (!cart) throw new Error('CartProvider is required'); return cart; }