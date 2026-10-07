import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/seo';
import { ConfigurationForm } from '@/components/configuration-form';
import { PinterestLink } from '@/components/studio-links';
import { useCart } from '@/lib/cart';
export const Route = createFileRoute('/custom-order')({validateSearch:(search:Record<string,unknown>) => ({edit:typeof search.edit === 'string' ? search.edit : undefined}),head:() => pageHead('Made for Your Idea','Send a sketch, screenshot or description. Prepare a custom bag brief for KÍMBÀLÌ and begin your conversation on WhatsApp.'),component:CustomOrder});
function CustomOrder() {
  const {edit} = Route.useSearch(); const cart = useCart(); const initial = cart.items.find(item => item.key === edit && item.custom);
  return <div className="container page custom-layout"><div><p className="eyebrow muted">Your idea / Our conversation</p><h1 className="page-title">Made for<br/>your <em className="text-primary">idea.</em></h1><p className="muted">Have your own design? Send us your sketch, a photograph or a screenshot. Tell us what you love, and what you would change.</p><p className="notice">References stay on this device. Attach the original image yourself when the WhatsApp conversation opens.</p><div className="studio-note"><p className="eyebrow">A little inspiration</p><p className="muted">Want a different style? Explore our Pinterest board for more ideas.</p><PinterestLink/></div></div><div><p className="eyebrow brief-heading">{initial ? 'Edit your commission' : 'Your custom bag brief'}</p><ConfigurationForm initial={initial}/></div></div>;
}