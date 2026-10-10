import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditorialCarousel } from '@/components/editorial-carousel';
import { editorial } from '@/data/visual-studies';
import { pageHead } from '@/lib/seo';
import { KimbaliLogo } from '@/components/kimbali-logo';
import { ScrollTextReveal } from '@/components/scroll-text-reveal';

export const Route = createFileRoute('/')({
  head: () => pageHead('Custom Leather Bag Design Studio', 'Find your bag in the KÍMBÀLÌ archive or bring your own idea. Custom leather bags, made in Nigeria.'),
  component: Home,
});

const words = ['Made in Nigeria', 'Leather', 'Suede', 'Made for your idea', 'Twenty-two references', 'Your bag, your way'];

function Home() {
  return <>
    <header className="campaign-hero">
      <img src={editorial.shoulder} alt="Leather shoulder bag with hand stitching" width={800} height={1008} fetchPriority="high"/>
      <div className="container campaign-copy">
        <KimbaliLogo className="h-12 w-12 text-white/90 mb-4" />
        <h1>KÍMBÀLÌ<br/><em>by design.</em></h1>
        <div className="campaign-side">
          <p>Leather bags shaped around the person who carries them.</p>
          <Button variant="studio" className="btn-light" asChild><Link to="/archive">Explore the archive <ArrowRight/></Link></Button>
        </div>
      </div>
    </header>

    <div className="marquee" aria-hidden="true"><div className="marquee-track">{[...words, ...words].map((word, i) => <span key={i}>{word}</span>)}</div></div>

    <section className="statement container py-20">
      <ScrollTextReveal
        text="Every bag begins as an idea. Some are ours. Some are yours. All of them are made to be kept."
        className="text-2xl sm:text-4xl md:text-5xl font-serif text-center max-w-4xl mx-auto leading-relaxed"
        highlightWords={['ours', 'yours']}
      />
    </section>

    <EditorialCarousel/>

    <section className="bento container">
      <div className="bento-head reveal"><h2>Your bag,<br/><em className="text-primary">your details.</em></h2><p className="muted">Material, colour, hardware - every reference in the archive can be made your own.</p></div>
      <div className="bento-grid reveal">
        <Link to="/archive" className="bento-tile tall has-image"><img src={editorial.tote} alt="Tan leather tote" loading="lazy" width={736} height={912}/><span className="bento-label">Totes</span></Link>
        <div className="bento-tile bento-text bento-dark"><strong>22</strong><span className="eyebrow">Archive references</span></div>
        <Link to="/archive" className="bento-tile has-image"><img src={editorial.material} alt="Leather and suede textures" loading="lazy"/><span className="bento-label">Materials</span></Link>
        <Link to="/archive" className="bento-tile wide has-image"><img src={editorial.messenger} alt="Leather messenger bag" loading="lazy" width={736} height={912}/><span className="bento-label">A different carry</span></Link>
      </div>
    </section>

    <section className="split">
      <div className="split-media"><img src={editorial.atelier} alt="Leather pieces laid out on a work table" loading="lazy"/></div>
      <div className="split-copy reveal"><p className="eyebrow muted">Custom order</p><h2>Made for<br/>your <em>idea.</em></h2><p className="muted">A sketch, a screenshot, a feeling. Bring it to us and we’ll make it real.</p><div className="actions"><Button variant="clay" asChild><Link to="/custom-order">Start a custom order <ArrowRight/></Link></Button></div></div>
    </section>

    <section className="split reverse">
      <div className="split-media"><img src={editorial.material} alt="Close-up of leather grain" loading="lazy"/></div>
      <div className="split-copy reveal"><p className="eyebrow muted">About</p><h2>Nigerian<br/><em>by design.</em></h2><p className="muted">Meet the studio behind every KÍMBÀLÌ bag.</p><div className="actions"><Button variant="frame" asChild><Link to="/studio">About KÍMBÀLÌ <ArrowRight/></Link></Button></div></div>
    </section>

    <section className="closing container reveal"><h2>Begin with<br/><em className="text-primary">a conversation.</em></h2><div className="actions"><Button variant="studio" asChild><Link to="/archive">Find your bag</Link></Button><Button variant="frame" asChild><Link to="/custom-order">Custom order</Link></Button></div></section>
  </>;
}
