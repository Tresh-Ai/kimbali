import { useState, type FormEvent } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { editorial } from '@/data/visual-studies';
import { whatsappUrl } from '@/lib/order';
import { pageHead } from '@/lib/seo';
import { ArchiveCover } from '@/components/archive-cover';
import { BusinessCollection } from '@/components/pillar-collections';

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
  return <>
    <ArchiveCover title="KÍMBÀLÌ for Business" description="Leather pieces for your people and your purpose." image={editorial.messenger} alt="Conceptual leather messenger bag study"/>
    <BusinessCollection/>
    <section id="business-brief" className="business-brief-band">
    <div className="container business-brief-layout">
      <div className="business-brief-intro"><h2>Tell us what<br/>you have in mind.</h2><p className="muted">Share the occasion, the pieces and the quantity. We’ll discuss the details with you.</p><dl><div><dt>The pieces</dt><dd>Bags, small leather goods or a coordinated combination.</dd></div><div><dt>The details</dt><dd>Your preferred colours, materials and company requirements.</dd></div><div><dt>The occasion</dt><dd>Who it is for, how many you need and your preferred timing.</dd></div></dl></div>
      <form className="form-stack" onSubmit={submit}>
        <div className="field"><label htmlFor="b-company">Company</label><input id="b-company" required value={f.company} onChange={set('company')}/></div>
        <div className="field"><label htmlFor="b-type">Order type</label><select id="b-type" value={f.type} onChange={set('type')}>{['Corporate gifts', 'Team or staff pieces', 'Bulk retail order', 'Other'].map(o => <option key={o}>{o}</option>)}</select></div>
        <div className="field"><label htmlFor="b-units">Estimated units</label><input id="b-units" required inputMode="numeric" value={f.units} onChange={set('units')}/></div>
        <div className="field"><label htmlFor="b-timing">Needed by (optional)</label><input id="b-timing" value={f.timing} onChange={set('timing')}/></div>
        <div className="field"><label htmlFor="b-notes">Notes (optional)</label><textarea id="b-notes" rows={3} value={f.notes} onChange={set('notes')}/></div>
        <Button variant="studio" type="submit">Send on WhatsApp <ArrowUpRight/></Button>
      </form>
    </div>
    </section>
  </>;
}
