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
  const [error,setError] = useState('');
  const [fileBusy,setFileBusy] = useState(false);
  useEffect(() => { setItem(initial || emptyItem(product)); if (initial?.custom) setBagType(initial.name.replace(/^Custom /,'')); },[initial,product]);
  const update = (key: keyof BagItem, value: string) => setItem(current => ({...current,[key]:value}));
  async function readReference(file?: File) {
    if (!file) return;
    if (!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)) { setError('Please choose a JPG, PNG, WebP or GIF image.'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Please choose an image smaller than 5 MB.'); return; }
    setFileBusy(true); setError('');
    try {
      const url = URL.createObjectURL(file);
      try {
        const image = new Image(); image.src = url; await image.decode();
        const ratio = Math.min(1,800/Math.max(image.width,image.height));
        const canvas = document.createElement('canvas'); canvas.width = Math.round(image.width*ratio); canvas.height = Math.round(image.height*ratio);
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Preview unavailable');
        context.drawImage(image,0,0,canvas.width,canvas.height);
        setItem(current => ({...current,referenceName:file.name,referenceData:canvas.toDataURL('image/jpeg',.7)}));
      } finally { URL.revokeObjectURL(url); }
    } catch { setError('This image could not be opened. Please try another image.'); }
    finally { setFileBusy(false); }
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    if (fileBusy) return;
    const saved = {...item,key:item.key || crypto.randomUUID(),name:product?.name || `Custom ${bagType}`};
    cart.save(saved);
    navigate({to:product ? '/bag' : '/order'});
  }
  const field = (key: 'otherMaterial'|'customColor'|'hardware'|'customization'|'description'|'notes',label: string,required=false,multiline=false) => <div className="field"><label htmlFor={`${id}-${key}`}>{label}{!required && ' (optional)'}</label>{multiline ? <textarea id={`${id}-${key}`} value={item[key]} onChange={event => update(key,event.target.value)} required={required} rows={3} maxLength={3000}/> : <input id={`${id}-${key}`} value={item[key]} onChange={event => update(key,event.target.value)} required={required} maxLength={400}/>}</div>;
  return <form className="form-stack" onSubmit={submit}>
    {!product && <div className="field"><label htmlFor={`${id}-type`}>Bag type</label><select id={`${id}-type`} value={bagType} onChange={event => setBagType(event.target.value)}>{bagTypes.map(type => <option key={type}>{type}</option>)}</select></div>}
    <fieldset className="field"><legend>Material request</legend><div className="choice-row">{materialRequests.map(material => <Button key={material} type="button" variant="choice" aria-pressed={item.material === material} onClick={() => update('material',material)}>{material}</Button>)}</div></fieldset>
    {item.material === 'Other / Custom' && field('otherMaterial','Describe your material',true)}
    {!compact && <>
      <fieldset className="field"><legend>Colour request</legend><div className="choice-row">{Array.from(new Set([...colorRequests,...(product?.colors || [])])).map(color => <Button key={color} type="button" variant="choice" aria-pressed={item.color === color} onClick={() => update('color',color)}>{['Brown','Tan','Black','White','Orange'].includes(color) && <span aria-hidden="true" className={`swatch swatch-${color.toLowerCase()}`}/>} {color}</Button>)}</div></fieldset>
      {item.color === 'Custom' && field('customColor','Describe your custom colour',true)}
      {product && (product.hardwareOptions.length ? <div className="field"><label htmlFor={`${id}-hardware`}>Hardware request</label><select id={`${id}-hardware`} value={item.hardware} onChange={event => update('hardware',event.target.value)}><option value="">Studio recommendation</option>{product.hardwareOptions.map(value => <option key={value}>{value}</option>)}</select></div> : field('hardware','Hardware preference — to be confirmed'))}
      {product && field('customization','Other customization requests',false,true)}
    </>}
    {!product && field('description',compact ? 'Your idea' : 'Describe your bag',true,true)}
    {!compact && <>
      <div className="field"><label htmlFor={`${id}-reference`}>Reference image (optional)</label><input id={`${id}-reference`} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={event => readReference(event.target.files?.[0])}/><span className="muted text-xs">JPG, PNG, WebP or GIF · up to 5 MB. Keep the original to attach in WhatsApp.</span>
        {item.referenceName && <div className="space-y-2">{item.referenceData && <img className="reference-preview" src={item.referenceData} alt="Your selected bag reference"/>}<p className="text-xs">{item.referenceName}</p><Button type="button" variant="text" onClick={() => setItem(current => ({...current,referenceName:'',referenceData:undefined}))}>Remove reference</Button></div>}
      </div>
      {field('notes','Additional notes',false,true)}
    </>}
    <p className="muted text-xs">These are your preferences, not confirmed specifications. The studio will confirm materials, details and pricing with you.</p>
    {error && <p className="error" role="alert">{error}</p>}
    <Button type="submit" variant={product ? 'studio' : 'clay'} disabled={!cart.ready || fileBusy}>{fileBusy ? 'Preparing image…' : initial ? 'Save changes' : product ? 'Add to your bag' : 'Prepare WhatsApp order'} <span aria-hidden="true">→</span></Button>
    {compact && <Button variant="text" asChild><a href="/custom-order">Add colours, details & a reference →</a></Button>}
  </form>;
}