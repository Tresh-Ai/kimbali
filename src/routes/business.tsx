import { useState, type FormEvent } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { editorial } from '@/data/visual-studies';
import { whatsappUrl } from '@/lib/order';
import { pageHead } from '@/lib/seo';

export const Route = createFileRoute('/business')({
  head: () => pageHead('KÍMBÀLÌ for Business', 'Bulk, corporate and gifting leather orders from KÍMBÀLÌ. Share your brief and talk to the studio.', '/business'),
  component: Business,
});

function Business() {
  const [f, setF] = useState({ company: '', units: '', type: 'Corporate gifts', timing: '', notes: '' });
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const msg = ['Hello KÍMBÀLÌ, a business enquiry:', `Company: ${f.company}`, `Order type: ${f.type}`, `Estimated units: ${f.units}`, f.timing && `Needed by: ${f.timing}`, f.notes && `Notes: ${f.notes}`].filter(Boolean).join('\n');
    const url = whatsappUrl(msg); if (url) window.open(url, '_blank', 'noopener');
  };
  return <section className="split">
    <div className="split-media"><img src={editorial.messenger} alt="Leather messenger bag" fetchPriority="high"/></div>
    <div className="split-copy">
      <p className="eyebrow muted">KÍMBÀLÌ for Business</p>
      <h1>Made in<br/><em>volume.</em></h1>
      <p className="muted">Corporate gifts, team pieces and bulk orders.</p>
      <form className="form-stack" onSubmit={submit}>
        <div className="field"><label htmlFor="b-company">Company</label><input id="b-company" required value={f.company} onChange={set('company')}/></div>
        <div className="field"><label htmlFor="b-type">Order type</label><select id="b-type" value={f.type} onChange={set('type')}>{['Corporate gifts', 'Team or staff pieces', 'Bulk retail order', 'Other'].map(o => <option key={o}>{o}</option>)}</select></div>
        <div className="field"><label htmlFor="b-units">Estimated units</label><input id="b-units" required inputMode="numeric" value={f.units} onChange={set('units')}/></div>
        <div className="field"><label htmlFor="b-timing">Needed by (optional)</label><input id="b-timing" value={f.timing} onChange={set('timing')}/></div>
        <div className="field"><label htmlFor="b-notes">Notes (optional)</label><textarea id="b-notes" rows={3} value={f.notes} onChange={set('notes')}/></div>
        <Button variant="studio" type="submit">Send on WhatsApp <ArrowUpRight/></Button>
      </form>
    </div>
  </section>;
}
