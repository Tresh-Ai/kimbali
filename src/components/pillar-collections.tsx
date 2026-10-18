import { Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { sets, businessUses } from '@/data/pillars';
import { Button } from '@/components/ui/button';

export function ComplimentaryCollection({ preview = false }: { preview?: boolean }) {
  return <section className={`container pillar-collection ${preview ? 'pillar-preview' : ''}`} aria-label="Complimentary collections">
    {preview && <div className="pillar-section-head"><div><h2>Complimentary Design</h2><p className="muted">Separate pieces. Made to belong together.</p></div><Button variant="frame" asChild><Link to="/complimentary-design">Explore complimentary <ArrowRight/></Link></Button></div>}
    <div className="complimentary-grid">{sets.map(set => <article className="product-card reveal" key={set.slug}>
      <Link to="/complimentary-design/$slug" params={{ slug: set.slug }} className="collection-image" aria-label={`Discover ${set.name}`}>
        <img src={set.image} alt={`Illustrative concept: ${set.pieces.join(' and ')}`} width={912} height={1120} loading="lazy"/>
      </Link>
      <div className="archive-card-title"><h3><Link to="/complimentary-design/$slug" params={{slug:set.slug}}>{set.name}</Link></h3><Button variant="text" size="icon" asChild><Link to="/complimentary-design/$slug" params={{slug:set.slug}} aria-label={`Open ${set.name}`}><ArrowUpRight/></Link></Button></div>
    </article>)}</div>
    {!preview && <p className="concept-note muted">Illustrative concepts. Each combination can be discussed with the studio.</p>}
  </section>;
}

export function BusinessCollection({ preview = false }: { preview?: boolean }) {
  return <section className={`container pillar-collection ${preview ? 'pillar-preview' : ''}`} aria-label="Business possibilities">
    <div className="pillar-section-head"><div><h2>{preview ? 'KÍMBÀLÌ for Business' : 'For your people. For your business.'}</h2><p className="muted">Gifts, team essentials and coordinated orders.</p></div>{preview ? <Button variant="frame" asChild><Link to="/business">Explore business <ArrowRight/></Link></Button> : <Button variant="frame" asChild><a href="#business-brief">Discuss your order <ArrowRight/></a></Button>}</div>
    <div className="business-gallery">{businessUses.map(use => <article key={use.title} className="business-use reveal">
      <div className="business-image"><img src={use.image} alt={`Illustrative leather concept for ${use.title.toLowerCase()}`} width={912} height={1120} loading="lazy"/></div>
      <h3>{use.title}</h3><p className="muted">{use.note}</p>
    </article>)}</div>
    {!preview && <p className="concept-note muted">Illustrative concepts, tailored to your brief.</p>}
  </section>;
}
