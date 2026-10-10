import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { editorial } from '@/data/visual-studies';

const items = [
  {
    title: 'Shoulder proportions',
    image: editorial.shoulder,
    alt: 'Structured leather shoulder bag study',
    category: '01 / 06 — Shoulder',
  },
  {
    title: 'Atelier material selection',
    image: editorial.atelier,
    alt: 'Leather swatches and studio study materials',
    category: '02 / 06 — Material',
  },
  {
    title: 'Everyday tote form',
    image: editorial.tote,
    alt: 'Tan tote bag design study',
    category: '03 / 06 — Tote',
  },
  {
    title: 'Crossbody & messenger shapes',
    image: editorial.messenger,
    alt: 'Messenger bag structure study',
    category: '04 / 06 — Messenger',
  },
  {
    title: 'Custom leather finish',
    image: editorial.material,
    alt: 'Hand finished full grain leather detail',
    category: '05 / 06 — Finish',
  },
  {
    title: 'Architectural silhouette',
    image: editorial.leather,
    alt: 'Sculptural leather bag silhouette',
    category: '06 / 06 — Form',
  },
];

export function EditorialCarousel() {
  const [viewport, api] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });
  const [selected, setSelected] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const onSelect = useCallback(() => {
    if (api) setSelected(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  // Scroll-driven horizontal shift as the user scrolls down past the section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (sectionRef.current && api) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Calculate progress when section is in viewport
            const totalDistance = rect.height + windowHeight;
            const currentPosition = windowHeight - rect.top;
            const progress = Math.max(0, Math.min(1, currentPosition / totalDistance));

            // Smoothly scroll the embla carousel as user scrolls down
            if (rect.top < windowHeight && rect.bottom > 0) {
              const snapList = api.scrollSnapList();
              if (snapList.length > 0) {
                const targetIndex = Math.min(
                  snapList.length - 1,
                  Math.floor(progress * snapList.length)
                );
                if (targetIndex !== api.selectedScrollSnap()) {
                  api.scrollTo(targetIndex);
                }
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [api]);

  return (
    <section className="archive-editorial relative" ref={sectionRef}>
      <div className="container">
        <div className="editorial-heading reveal">
          <div>
            <p className="eyebrow muted">Find your starting point</p>
            <h2 className="text-4xl sm:text-6xl font-serif">
              <em>The Archive</em>
            </h2>
            <p className="muted">22 references. A shape to make your own.</p>
          </div>
          <div className="carousel-controls flex items-center gap-3">
            <span className="eyebrow muted font-mono" aria-live="polite">
              {String(selected + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <Button
              variant="frame"
              size="icon"
              title="Previous study"
              aria-label="Previous study"
              onClick={() => api?.scrollPrev()}
            >
              <ArrowLeft size={18} />
            </Button>
            <Button
              variant="frame"
              size="icon"
              title="Next study"
              aria-label="Next study"
              onClick={() => api?.scrollNext()}
            >
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>

        <div
          className="carousel-viewport overflow-hidden cursor-grab active:cursor-grabbing"
          ref={viewport}
          aria-roledescription="carousel"
          aria-label="Bag design inspiration"
        >
          <div className="carousel-track flex gap-6">
            {items.map((study, idx) => (
              <article
                className="editorial-slide group relative transition-transform duration-500 hover:-translate-y-1"
                key={study.title}
              >
                <div className="overflow-hidden rounded-md border border-border/60 bg-card shadow-sm mb-4">
                  <Link to="/archive" className="image-link block overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.alt}
                      width={736}
                      height={912}
                      loading="lazy"
                      className="w-full aspect-[3/4] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>
                </div>
                <div className="slide-heading flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono block mb-1">
                      {study.category}
                    </span>
                    <h3 className="text-lg font-serif group-hover:text-primary transition-colors">
                      {study.title}
                    </h3>
                  </div>
                  <Button variant="text" size="icon" asChild>
                    <Link to="/archive" aria-label={`Browse archive: ${study.title}`}>
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button variant="frame" className="archive-link inline-flex items-center gap-2" asChild>
            <Link to="/archive">
              Explore all 22 references <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
