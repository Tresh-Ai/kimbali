import { useState, type FormEvent } from 'react';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { sets } from '@/data/pillars';
import { pillarImagery } from '@/data/pillar-imagery';
import { Button } from '@/components/ui/button';
import { whatsappUrl } from '@/lib/order';
import { pageHead } from '@/lib/seo';
export const Route = createFileRoute('/complimentary-design/$slug')({
  loader: ({params}) => {
    const set = sets.find(item => item.slug === params.slug);
    if (!set) throw notFound();
    return set;
  },
  head: ({loaderData}) => pageHead(loaderData?.name || 'Complimentary collection', loaderData?.note || 'Discover coordinated KÍMBÀLÌ leather pieces.', loaderData ? `/complimentary-design/${loaderData.slug}` : '/complimentary-design'),
  component: CollectionDetail,
});
function CollectionDetail() {
  const set = Route.useLoaderData();
  const [notes, setNotes] = useState('');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const message = [`Hello KÍMBÀLÌ, I'm interested in ${set.name}.`, `Pieces: ${set.pieces.join(' + ')}`, notes.trim() && `My preferences: ${notes.trim()}`].filter(Boolean).join('\n');
    const url = whatsappUrl(message);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };
  return <section className="container page collection-detail">
    <Link to="/complimentary-design" className="collection-back"><ArrowLeft size={16}/> Complimentary Design</Link>
    <div className="detail-grid">
      <img className="collection-detail-image" src={pillarImagery[set.slug as keyof typeof pillarImagery]} alt={`Illustrative concept: ${set.pieces.join(' and ')}`} width={912} height={1120} fetchPriority="high"/>
      <div className="collection-detail-copy"><h1>{set.name}</h1><p className="muted">{set.note}</p><ul className="collection-pieces">{set.pieces.map(piece => <li key={piece}>{piece}</li>)}</ul>
        <form className="form-stack" onSubmit={submit}><div className="field"><label htmlFor="collection-notes">Your preferences (optional)</label><textarea id="collection-notes" rows={3} placeholder="Colour, material or a different combination" value={notes} onChange={event => setNotes(event.target.value)}/></div><Button variant="studio" type="submit">Discuss this combination <ArrowUpRight/></Button></form>
        <p className="concept-note muted">An illustrative concept, not a finished catalogue piece. Final details are agreed with the studio.</p>
      </div>
    </div>
  </section>;
}
