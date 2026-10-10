import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { pageHead } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { editorial } from '@/data/visual-studies';

export const Route = createFileRoute('/studio')({
  head: () => pageHead('About KÍMBÀLÌ', 'KÍMBÀLÌ is a Nigerian custom leather bag design studio: archive designs and personal commissions, made for your idea.'),
  component: About,
});

function About() {
  return <>
    <header className="about-hero">
      <img src={editorial.atelier} alt="Leather pieces on a studio work table" width={1600} height={1000} fetchPriority="high"/>
      <div className="container"><p className="eyebrow">About</p><h1>Nigerian<br/><em>by design.</em></h1></div>
    </header>
    <section className="statement container"><p className="reveal">KÍMBÀLÌ is a custom leather bag design studio, <em>made in Nigeria</em> and made for your idea.</p></section>
    <section className="about-pillars">
      <article className="reveal"><span>01</span><h3>The archive</h3><p className="muted">Twenty-two references, each ready to be reinterpreted in your material and colour.</p></article>
      <article className="reveal reveal-delay"><span>02</span><h3>Your idea</h3><p className="muted">Bring a sketch, a photo or a description. We shape it into a bag.</p></article>
      <article className="reveal reveal-delay"><span>03</span><h3>A conversation</h3><p className="muted">Every order is discussed directly with the studio on WhatsApp or email.</p></article>
    </section>
    <section className="split">
      <div className="split-media"><img src={editorial.material} alt="Leather and suede textures" loading="lazy"/></div>
      <div className="split-copy reveal"><p className="eyebrow muted">Inspiration</p><h2>Find your<br/><em>next shape.</em></h2><p className="muted">Browse the archive, or explore Pinterest for examples and ideas you might like.</p><div className="actions"><Button variant="studio" asChild><Link to="/archive">Explore the archive <ArrowRight/></Link></Button><Button variant="frame" asChild><Link to="/custom-order">Custom order</Link></Button></div></div>
    </section>
  </>;
}
