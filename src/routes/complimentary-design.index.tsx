import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { editorial } from '@/data/visual-studies';
import { sets } from '@/data/pillars';
import { whatsappUrl } from '@/lib/order';
import { pageHead } from '@/lib/seo';

export const Route = createFileRoute('/complimentary-design/')({
  head: () => pageHead('Complimentary Design', 'Coordinated KÍMBÀLÌ leather pieces and sets, made to match in one material and colour.', '/complimentary-design'),
  component: Complimentary,
});

function Complimentary() {
  return <>
    <section className="split">
      <div className="split-media"><img src={editorial.atelier} alt="Coordinated leather pieces on a work table" fetchPriority="high"/></div>
      <div className="split-copy"><p className="eyebrow muted">Complimentary Design</p><h1>Pieces that<br/><em>belong together.</em></h1><p className="muted">Bags, small leather goods and accents, made as one coordinated set.</p></div>
    </section>
    <section className="container pillar-sets">
      {sets.map(set => <article key={set.name} className="pillar-set reveal">
        <h2>{set.name}</h2>
        <p className="muted">{set.note}</p>
        <ul>{set.pieces.map(p => <li key={p}>{p}</li>)}</ul>
        <Button variant="frame" asChild><a href={whatsappUrl(`Hello KÍMBÀLÌ, I'm interested in ${set.name} (${set.pieces.join(' + ')}).`) || undefined} target="_blank" rel="noopener noreferrer">Ask about this set <ArrowUpRight/></a></Button>
      </article>)}
    </section>
    <section className="closing container reveal"><h2>Your own<br/><em className="text-primary">combination.</em></h2><div className="actions"><Button variant="studio" asChild><a href={whatsappUrl('Hello KÍMBÀLÌ, I would like a coordinated set of my own.') || undefined} target="_blank" rel="noopener noreferrer">Plan a set</a></Button></div></section>
  </>;
}
