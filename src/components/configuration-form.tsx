import { useEffect, useId, useState, type FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { materialRequests, colorRequests, bagTypes } from '@/data/studio';
import type { Product } from '@/data/products';
import type { BagItem } from '@/lib/order';
import { useCart } from '@/lib/cart';

function emptyItem(product?: Product): BagItem {
  return { key:'', productId:product?.id, productSlug:product?.slug, name:product?.name || 'Custom Shoulder bag',
    quantity:1, material:product?.materials[0] || 'Leather',otherMaterial:'',color:product?.colors[0] || 'Brown',customColor:'',
    hardware:'',customization:'',description:'',notes:'',referenceName:'',custom:!product };
}
export function ConfigurationForm({product,initial,compact=false}: {product?: Product | undefined; initial?: BagItem | undefined; compact?: boolean | undefined}) {
  const id = useId();
  const cart = useCart();
  const navigate = useNavigate();
  const [item,setItem] = useState<BagItem>(() => initial || emptyItem(product));
  const [bagType,setBagType] = useState(initial?.name.replace(/^Custom /,'') || 'Shoulder bag');
  useEffect(() => { setItem(initial || emptyItem(product)); if (initial?.custom) setBagType(initial.name.replace(/^Custom /,'')); },[initial,product]);
  const update = (key: keyof BagItem, value: string) => setItem(current => ({...current,[key]:value}));
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!cart.ready) return;
    const saved = {...item,key:item.key || crypto.randomUUID(),name:product?.name || `Custom ${bagType}`,referenceName:'',referenceData:undefined};
    cart.save(saved);
    navigate({to:'/bag'});
  }
  const field = (key: 'otherMaterial'|'customColor'|'hardware'|'customization'|'description'|'notes',label: string,required=false,multiline=false) => <div className="field"><label htmlFor={`${id}-${key}`}>{label}{!required && ' (optional)'}</label>{multiline ? <textarea id={`${id}-${key}`} value={item[key]} onChange={event => update(key,event.target.value)} required={required} rows={3} maxLength={3000}/> : <input id={`${id}-${key}`} value={item[key]} onChange={event => update(key,event.target.value)} required={required} maxLength={400}/>}</div>;
  return <form className="form-stack" onSubmit={submit}>
    {!product && <div className="field"><label htmlFor={`${id}-type`}>Bag type</label><select id={`${id}-type`} value={bagType} onChange={event => setBagType(event.target.value)}>{bagTypes.map(type => <option key={type}>{type}</option>)}</select></div>}
    {!product && field('description','Describe your bag',true,true)}
    <fieldset className="field"><legend>Material</legend><div className="choice-row">{materialRequests.map(material => <Button key={material} type="button" variant="choice" aria-pressed={item.material === material} onClick={() => update('material',material)}>{material}</Button>)}</div></fieldset>
    {item.material === 'Other / Custom' && field('otherMaterial','Describe your material',true)}
    <fieldset className="field"><legend>Colour</legend><div className="choice-row">{Array.from(new Set([...colorRequests,...(product?.colors || [])])).map(color => <Button key={color} type="button" variant="choice" aria-pressed={item.color === color} onClick={() => update('color',color)}>{['Brown','Tan','Black','White','Orange'].includes(color) && <span aria-hidden="true" className={`swatch swatch-${color.toLowerCase()}`}/>} {color}</Button>)}</div></fieldset>
    {item.color === 'Custom' && field('customColor','Describe your custom colour',true)}
    {!compact && <details className="form-details" open={Boolean(initial && (initial.hardware || initial.customization || initial.notes))}>
      <summary>More details (optional)</summary>
      <div className="details-body">
        {product && (product.hardwareOptions.length ? <div className="field"><label htmlFor={`${id}-hardware`}>Hardware</label><select id={`${id}-hardware`} value={item.hardware} onChange={event => update('hardware',event.target.value)}><option value="">Studio recommendation</option>{product.hardwareOptions.map(value => <option key={value}>{value}</option>)}</select></div> : field('hardware','Hardware preference'))}
        {product && field('customization','Other requests',false,true)}
        {field('notes','Notes',false,true)}
      </div>
    </details>}
    <Button type="submit" variant={product ? 'studio' : 'clay'} disabled={!cart.ready}>{initial ? 'Save changes' : 'Add to your bag'} <span aria-hidden="true">→</span></Button>
    <p className="muted text-xs">The studio will confirm materials, details and pricing with you.</p>
  </form>;
}