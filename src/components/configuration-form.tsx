import { useEffect, useId, useState, type FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { materialRequests, colorRequests, bagTypes } from '@/data/studio';
import type { Product } from '@/data/products';
import type { BagItem } from '@/lib/order';
import { useCart } from '@/lib/cart';

function emptyItem(product?: Product): BagItem {
  return {
    key: '',
    productId: product?.id,
    productSlug: product?.slug,
    name: product?.name || 'Custom Shoulder bag',
    quantity: 1,
    material: product?.materials[0] || 'Leather',
    otherMaterial: '',
    color: product?.colors[0] || 'Brown',
    customColor: '',
    hardware: '',
    customization: '',
    description: '',
    notes: '',
    referenceName: '',
    custom: !product,
  };
}

interface CustomSelectProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  id: string;
}

function CustomSelect({ label, value, options, onChange, id }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find(o => o.value === value)?.label || value || 'Select option';

  return (
    <div className="field archive-filter relative">
      <label id={`${id}-label`} htmlFor={`${id}-button`}>
        {label}
      </label>
      <Button
        id={`${id}-button`}
        type="button"
        variant="text"
        className="archive-filter-trigger w-full justify-between border border-border px-3 py-2 rounded-md bg-background text-left font-normal"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={`${id}-label ${id}-button`}
        onClick={() => setOpen(!open)}
      >
        <span>{selectedLabel}</span>
        <ChevronDown size={16} className="ml-2 muted" aria-hidden="true" />
      </Button>

      {open && (
        <>
          <Button
            variant="ghost"
            type="button"
            className="filter-dismiss"
            tabIndex={-1}
            aria-label={`Close ${label} dropdown`}
            onClick={() => setOpen(false)}
          />
          <div
            className="archive-filter-menu w-full mt-1 z-50 bg-background border border-border shadow-md rounded-md p-1"
            role="listbox"
            aria-labelledby={`${id}-label`}
            onKeyDown={event => {
              if (event.key === 'Escape') setOpen(false);
            }}
          >
            {options.map(opt => (
              <Button
                key={opt.value}
                type="button"
                variant="ghost"
                role="option"
                aria-selected={value === opt.value}
                className="w-full justify-between text-left text-sm font-normal px-3 py-2 h-auto"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                <span>{opt.label}</span>
                {value === opt.value && <Check size={14} className="ml-2" aria-hidden="true" />}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ConfigurationForm({
  product,
  initial,
  compact = false,
}: {
  product?: Product | undefined;
  initial?: BagItem | undefined;
  compact?: boolean | undefined;
}) {
  const id = useId();
  const cart = useCart();
  const navigate = useNavigate();
  const [item, setItem] = useState<BagItem>(() => initial || emptyItem(product));
  const [bagType, setBagType] = useState(initial?.name.replace(/^Custom /, '') || 'Shoulder bag');

  useEffect(() => {
    setItem(initial || emptyItem(product));
    if (initial?.custom) setBagType(initial.name.replace(/^Custom /, ''));
  }, [initial, product]);

  const update = (key: keyof BagItem, value: string) =>
    setItem(current => ({ ...current, [key]: value }));

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!cart.ready) return;
    const saved = {
      ...item,
      key: item.key || crypto.randomUUID(),
      name: product?.name || `Custom ${bagType}`,
      referenceName: '',
      referenceData: undefined,
    };
    cart.save(saved);
    navigate({ to: '/bag' });
  }

  const field = (
    key: 'otherMaterial' | 'customColor' | 'hardware' | 'customization' | 'description' | 'notes',
    label: string,
    required = false,
    multiline = false
  ) => (
    <div className="field">
      <label htmlFor={`${id}-${key}`}>
        {label}
        {!required && ' (optional)'}
      </label>
      {multiline ? (
        <textarea
          id={`${id}-${key}`}
          value={item[key]}
          onChange={event => update(key, event.target.value)}
          required={required}
          rows={3}
          maxLength={3000}
        />
      ) : (
        <input
          id={`${id}-${key}`}
          value={item[key]}
          onChange={event => update(key, event.target.value)}
          required={required}
          maxLength={400}
        />
      )}
    </div>
  );

  return (
    <form className="form-stack" onSubmit={submit}>
      {!product && (
        <CustomSelect
          id={`${id}-type`}
          label="Bag type"
          value={bagType}
          options={bagTypes.map(t => ({ label: t, value: t }))}
          onChange={setBagType}
        />
      )}

      {!product && field('description', 'Describe your bag', true, true)}

      <fieldset className="field">
        <legend>Material</legend>
        <div className="choice-row">
          {materialRequests.map(material => (
            <Button
              key={material}
              type="button"
              variant="choice"
              aria-pressed={item.material === material}
              onClick={() => update('material', material)}
            >
              {material}
            </Button>
          ))}
        </div>
      </fieldset>

      {item.material === 'Other / Custom' && field('otherMaterial', 'Describe your material', true)}

      <fieldset className="field">
        <legend>Colour</legend>
        <div className="choice-row">
          {Array.from(new Set([...colorRequests, ...(product?.colors || [])])).map(color => (
            <Button
              key={color}
              type="button"
              variant="choice"
              aria-pressed={item.color === color}
              onClick={() => update('color', color)}
            >
              {['Brown', 'Tan', 'Black', 'White', 'Orange'].includes(color) && (
                <span aria-hidden="true" className={`swatch swatch-${color.toLowerCase()}`} />
              )}{' '}
              {color}
            </Button>
          ))}
        </div>
      </fieldset>

      {item.color === 'Custom' && field('customColor', 'Describe your custom colour', true)}

      {!compact && (
        <div className="form-details space-y-4 pt-2 border-t border-border/60">
          {product ? (
            product.hardwareOptions.length ? (
              <CustomSelect
                id={`${id}-hardware`}
                label="Hardware"
                value={item.hardware}
                options={[
                  { label: 'Studio recommendation', value: '' },
                  ...product.hardwareOptions.map(h => ({ label: h, value: h })),
                ]}
                onChange={val => update('hardware', val)}
              />
            ) : (
              field('hardware', 'Hardware preference')
            )
          ) : null}
          {product && field('customization', 'Other requests', false, true)}
          {field('notes', 'Notes', false, true)}
        </div>
      )}

      <Button type="submit" variant={product ? 'studio' : 'clay'} disabled={!cart.ready}>
        {initial ? 'Save changes' : 'Add to your bag'} <span aria-hidden="true">→</span>
      </Button>
      <p className="muted text-xs">The studio will confirm materials, details and pricing with you.</p>
    </form>
  );
}
