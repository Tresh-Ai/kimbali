import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { editorial } from '@/data/visual-studies';
import { products } from '@/data/products';

const items = [
  { title: 'Shoulder proportions', image: editorial.shoulder, alt: 'Structured leather shoulder bag study', category: 'Shoulder' },
  { title: 'Atelier material selection', image: editorial.atelier, alt: 'Leather swatches and studio materials', category: 'Material' },
  { title: 'Everyday tote form', image: editorial.tote, alt: 'Tan tote bag design study', category: 'Tote' },
  { title: 'Crossbody & messenger shapes', image: editorial.messenger, alt: 'Messenger bag structure study', category: 'Messenger' },
  { title: 'Custom leather finish', image: editorial.material, alt: 'Hand finished leather detail', category: 'Finish' },
  { title: 'Architectural silhouette', image: editorial.leather, alt: 'Sculptural leather bag silhouette', category: 'Form' },
];

/**
 * Pinned horizontal scroll: the section height equals viewport + horizontal travel,
 * so vertical scrolling maps 1:1 to sideways movement and releases with no dead space.
 */
export function EditorialCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const measure = () => {
      const track = trackRef.current, vp = viewportRef.current;
      if (!track || !vp) return;
      const enabled = !mq.matches && window.innerWidth >= 768;
      setPinned(enabled);
      setTravel(enabled ? Math.max(0, track.scrollWidth - vp.clientWidth) : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    mq.addEventListener('change', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); mq.removeEventListener('change', measure); };
  }, []);

  useEffect(() => {
    if (!pinned || travel <= 0) { if (trackRef.current) trackRef.current.style.transform = ''; return; }
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current, track = trackRef.current;
      if (!section || !track) return;
      const scrolled = -section.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, scrolled / travel));
      track.style.transform = `translate3d(${-progress * travel}px,0,0)`;
      setActive(Math.min(items.length - 1, Math.round(progress * (items.length - 1))));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, [pinned, travel]);

  return (
    <section
      ref={sectionRef}
      className="hscroll"
      style={pinned ? { height: `calc(100vh + ${travel}px)` } : undefined}
      aria-label="The Archive"
    >
      <div className={pinned ? 'hscroll-sticky' : 'hscroll-static'}>
        <div className="container hscroll-head">
          <div>
            <p className="eyebrow muted">Find your starting point</p>
            <h2><em>The Archive</em></h2>
          </div>
          <span className="eyebrow muted font-mono" aria-hidden="true">
            {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>

        <div ref={viewportRef} className="hscroll-viewport">
          <div ref={trackRef} className="hscroll-track">
            {items.map((study) => (
              <article className="hscroll-card group" key={study.title}>
                <Link to="/archive" className="hscroll-media" aria-label={`Browse archive: ${study.title}`}>
                  <img src={study.image} alt={study.alt} width={736} height={912} loading="lazy" />
                </Link>
                <div className="hscroll-meta">
                  <span className="eyebrow muted">{study.category}</span>
                  <h3>{study.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="container hscroll-foot">
          <Button variant="frame" asChild>
            <Link to="/archive">Explore all {products.length} references <ArrowRight size={16} /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
