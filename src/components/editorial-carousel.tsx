import { useCallback, useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { visualStudies } from '@/data/visual-studies';

export function EditorialCarousel() {
  const [viewport, api] = useEmblaCarousel({ align: 'start', loop: true });
  const [selected, setSelected] = useState(0);
  const onSelect = useCallback(() => { if (api) setSelected(api.selectedScrollSnap()); }, [api]);
  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on('select', onSelect);
    return () => { api.off('select', onSelect); };
  }, [api, onSelect]);
  return <section className="archive-editorial">
    <div className="container">
      <div className="editorial-heading reveal"><div><p className="eyebrow muted">Find your starting point</p><h2><em>The Archive</em></h2><p className="muted">22 references. A shape to make your own.</p></div><div className="carousel-controls"><span className="eyebrow muted" aria-live="polite">{String(selected + 1).padStart(2, '0')} / 03</span><Button variant="frame" size="icon" title="Previous image" aria-label="Previous image" onClick={() => api?.scrollPrev()}><ArrowLeft/></Button><Button variant="frame" size="icon" title="Next image" aria-label="Next image" onClick={() => api?.scrollNext()}><ArrowRight/></Button></div></div>
      <div className="carousel-viewport" ref={viewport} aria-roledescription="carousel" aria-label="Bag design inspiration"><div className="carousel-track">{visualStudies.map(study => <article className="editorial-slide" key={study.title}><Link to="/archive" className="image-link"><img src={study.image} alt={study.alt} width={736} height={912} loading="lazy"/></Link><div className="slide-heading"><h3>{study.title}</h3><Button variant="text" asChild><Link to="/archive" aria-label={`Browse archive — ${study.title}`}><ArrowRight/></Link></Button></div></article>)}</div></div>
      <Button variant="frame" className="archive-link" asChild><Link to="/archive">Explore all 22 references <ArrowRight/></Link></Button>
    </div>
  </section>;
}